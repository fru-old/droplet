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
  }
};
