import { TouchBackend } from 'react-dnd-touch-backend';
import HtmlBackend from 'react-dnd-html5-backend';
import rbush from 'rbush';

export class BackendFacade {

  registries = {};
  engine = rbush();
  constructor() {
    this.backend = this._buildBackend();
  }

  static singleton() {
    if (!BackendFacade.instance) BackendFacade.instance = new BackendFacade();
    return BackendFacade.instance;
  }

  // State

  _updateState(clientOffset) {
    let registry = this.registries[this.sourceId];
    if (!this.undoSelection) {
      this.beginCoordinate = clientOffset;
      this.undoSelection = registry.setSelected(this.sourceId);
      this._setDropZones(registry.getTargets(this.sourceId));
    }
    this.lastCoordinate = clientOffset;
  }

  _resetState() {
    if (this.undoSelection) this.undoSelection();
    this.sourceId = null;
    this.beginCoordinate = null;
    this.lastCoordinate  = null;
  }

  // RBusch

  _getMatches({x, y}) {
      let coordinate = {minX: x, maxX: x, minY: y, maxY: y};
      return this.engine.search(coordinate).map(x => x.original);
  }

  _getRectangleFromTarget({original, x, y, width, height}) {
    return {original, minX: x, maxX: x + width, minY: y, maxY: y + height}
  }

  _setDropZones(targets) {
    this.engine.clear();
    this.engine.load(targets.map(x => this._getRectangleFromTarget(x)));
  }

  // Drag backends

  connectSource(id, registry, source, preview) {
    this.registries[id] = registry;
    let undoSource = this.backend.connectDragSource(id, source);
    let undoPreview = this.backend.connectDragPreview(id, preview);
    return () => {
      undoSource();
      undoPreview();
      delete this.registries[id];
    }
  }

  connectRoot(id, registry, target) {
    return this.backend.connectDropTarget(id, target);
  }

  isDragging() {
    return !!this.sourceId.length;
  }

  _buildBackend() {
    let options = {
      getActions:  () => this._getActions(),
      getMonitor:  () => this._getMonitor(),
      getContext:  () => document,
      getRegistry: () => { addSource: () => {} }
    };
    let supportsTouch = 'ontouchstart' in document;
    let Backend = supportsTouch ? TouchBackend : HtmlBackend;
    let backend = new Backend(options, { enableMouseEvents: true });
    backend.setup();
    return backend;
  }

  _getActions() {
    return {
      beginDrag: (sourceId) => {
        this.sourceId = sourceId;
      },
      publishDragSource: () => {},
      hover: (_, {clientOffset}) => {
        this._updateState(clientOffset);
        let registry = this.registries[this.sourceId];
        var matches  = this._getMatches(clientOffset);
        registry.hover(matches, this.beginCoordinate, clientOffset);
      },
      drop: () => {
        let registry = this.registries[this.sourceId];
        var matches  = this._getMatches(this.lastCoordinate);
        registry.drop(matches, this.beginCoordinate, this.lastCoordinate);
      },
      endDrag: () => {
        this._resetState();
      }
    };
  }

  _getMonitor() {
    return {
      isDragging:  () => this.isDragging(),
      getSourceId: () => this.sourceId,
      getItemType: () => {},
      didDrop: () => false,
      canDropOnTarget: () => this.lastCoordinate && this._getMatches(this.lastCoordinate).length > 0
    }
  }
}
