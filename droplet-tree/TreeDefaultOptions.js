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
  if (overwrites.getPreview) this.getPreview = overwrites.getPreview;
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
  getId: function (node) {
    return node[this.idProperty];
  },
  getBoundingBox: function (node) {
    let element =  BackendFacade.singleton().getElement(this.getId(node));
    let rect = element.getBoundingClientRect();
    return {x: rect.left, y: rect.top, width: rect.width, height: rect.height};
  },
  getLeftSpacing: function(node, path) {
    return path.getLevel() * this.levelWidth;
  },
  getPreview: function(info) {
    return getPreview(info, this);
  }
};
