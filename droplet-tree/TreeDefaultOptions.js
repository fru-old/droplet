import { BackendFacade } from 'droplet-core';
import { getPreview } from './helper/preview';

export function TreeDefaultOptions(props) {
  this.selected = [];
  this.setProps(props);
}

TreeDefaultOptions.prototype.setProps = function (props) {
  this.applyOptions(TreeDefaultOptions.defaults);
  this.applyOptions(props.options || {});
  this.applyOptions(props); // Highest prio - Overrides all previous
};

TreeDefaultOptions.prototype.applyOptions = function (values) {
  for (var key in values) {
    if (values[key] === undefined) continue;
    this[key] = values[key];
  }
};

TreeDefaultOptions.defaults = {
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
    console.log(this.getId(node));
    let element =  BackendFacade.singleton().getElement(this.getId(node));
    console.log(element);
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
  removeNode: function(parent, multi, rowIndex, nodeIndex) {
    if (multi.length === 1) {
      delete parent[rowIndex];
    } else {
      delete multi[nodeIndex];
    }
  }
};
