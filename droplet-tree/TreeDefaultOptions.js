import { BackendFacade } from 'droplet-core';
import { getPreview } from './helper/preview';

export function TreeDefaultOptions(overwrites) {
  this.selected = {};
  this.idProperty = overwrites.idProperty || 'id';
  this.titleProperty = overwrites.titleProperty || 'title';
  this.multiProperty = overwrites.multiProperty || 'multi';
  this.childProperty = overwrites.childProperty || 'children';
  this.levelWidth = overwrites.levelWidth || 20;
  this.extraSpacing = overwrites.extraSpacing || 8;

  if (overwrites.getId) this.getId = overwrites.getId;
  if (overwrites.isSelected) this.isSelected = overwrites.isSelected;
  if (overwrites.getContent) this.getContent = overwrites.getContent;
  if (overwrites.getMultiList) this.getMultiList = overwrites.getMultiList;
  if (overwrites.getChildList) this.getChildList = overwrites.getChildList;
  if (overwrites.getBoundingBox) this.getBoundingBox = overwrites.getBoundingBox;
  if (overwrites.getRowBoundingBox) this.getRowBoundingBox = overwrites.getRowBoundingBox;
  if (overwrites.getPreview) this.getPreview = overwrites.getPreview;
  if (overwrites.removeNode) this.removeNode = overwrites.removeNode;
}

TreeDefaultOptions.prototype = {
  getMultiList: function (row) {
    return row[this.multiProperty] || [row];
  },
  getChildList: function (row) {
    return row[this.childProperty] || [];
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
  removeNode: function(parent, multi, rowIndex, nodeIndex) {
    console.log(arguments);
    if (multi.length === 1) {
      delete parent[rowIndex];
    } else {
      delete multi[nodeIndex];
    }
  }
};
