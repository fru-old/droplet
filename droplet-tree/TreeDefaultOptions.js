import { BackendFacade } from 'droplet-core';
import { getPreview } from './helper/preview';

export function TreeDefaultOptions(props) {
  this.selected = [];
  this.setProps(props);
}

TreeDefaultOptions.prototype.setProps = function (props) {
  this.applyOptions(TreeDefaultOptions.prototype.defaults);
  this.applyOptions(props.options || {});
  this.applyOptions(props); // Highest prio - Overrides all previous
};

TreeDefaultOptions.prototype.applyOptions = function (values) {
  for (var key in values) {
    if (values[key] === undefined) continue;
    this[key] = values[key];
  }
};

TreeDefaultOptions.prototype.defaults = {
  idProperty: 'id',
  titleProperty: 'title',
  multiProperty: 'multi',
  childProperty: 'children',
  levelWidth: 20,
  extraSpacing: 8,
  getMultiList: function (row) {
    return row[this.multiProperty] || [row];
  },
  getChildList: function (row) {
    return row[this.childProperty] || [];
  },
  onSelectChange: function (id, selected) {
    if (selected) this.selected[id] = true;
    else delete this.selected[id];
  },
  isSelected: function (node) {
    return !!this.selected[this.getId(node)];
  },
  getContent: function (node) {
    return node[this.titleProperty];
  },
  getRowId: function (row) {
    return this.getMultiList(row).map(x => this.getId(x)).join('-');
  },
  getId: function (node) {
    return node[this.idProperty];
  },
  getBoundingBox: function (node) {
    let element =  BackendFacade.singleton().getElement(this.getId(node));
    let rect = element.getBoundingClientRect();
    return {x: rect.left, y: rect.top, width: rect.width, height: rect.height};
  },
  getRowBoundingBox: function (row) {
    var boxes = this.getMultiList(row).map(n => this.getBoundingBox(n));
    var x = Math.max(...boxes.map(b => b.x));
    var y = Math.max(...boxes.map(b => b.y));
    var width  = Math.max(...boxes.map(b => b.x + b.width))  - x;
    var height = Math.max(...boxes.map(b => b.y + b.height)) - y;
    return {x, y, width, height};
  },
  getLeftSpacing: function(node, path) {
    return path.getLevel() * this.levelWidth;
  },
  getPreview: function(info) {
    return getPreview(info, this);
  },
  getEditableCopy: function(original) {
    return JSON.parse(JSON.stringify(original));
  },
  removeNode: function(rows, multi, rowIndex, nodeIndex) {
    if (multi.length === 1) {
      rows.splice(rowIndex, 1);
    } else {
      multi.splice(nodeIndex, 1);
    }
  },
  insertNode(rows, multi, rowIndex, nodeIndex, node) {
    if (nodeIndex === null) { // a new row is being created
      rows.splice(rowIndex, 0, node);
    } else {
      multi.splice(nodeIndex, 0, node);
    }
  }
};
