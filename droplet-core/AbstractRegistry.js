import { BackendFacade } from './BackendFacade';

export class AbstractRegistry {

  backend = BackendFacade.singleton();
  undo = {};
  source = {};
  preview = {};

  _updateSourceAndPreview(id) {
    if (this.undo[id]) this.undo[id]();
    let source  = this.source[id];
    let preview = this.preview[id] || source;

    if (source) {
      this.undo[id] = this.backend.connectSource(id, this, source, preview);
    } else {
      this.undo[id] = null;
    }
  }

  isDragging() {
    return this.backend.isDragging();
  }

  connectSource(id, source) {
    this.source[id] = source;
    this._updateSourceAndPreview(id);
    return this.undo[id];
  }

  connectPreview(id, preview) {
    this.preview[id] = preview;
    this._updateSourceAndPreview(id);
    return () => {
      delete this.preview[id];
      this._updateSourceAndPreview(id);
    };
  }

  connectRoot(id, target) {
    return this.backend.connectRoot(id, this, target);
  }
}
