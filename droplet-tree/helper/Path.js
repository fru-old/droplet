import assert from 'assert';

export class Path {
  constructor(hierarchy, positionInRow) {
    assert(hierarchy && hierarchy.length);
    assert(positionInRow === undefined || positionInRow >= 0)
    this.hierarchy = hierarchy;
    this.positionInRow = positionInRow;
    this.id = hierarchy.join('-') + '_' + positionInRow;
  }

  isFirstInRow() { return this.positionInRow === 0; }
  getLevel() { return this.hierarchy.length - 1; }
  getIndex() { return this.hierarchy[this.hierarchy.length - 1]; }
  getNodeIndex() { return this.positionInRow; }
  getParentRow() {
    return this.getAncestorRow(this.getLevel() - 1);
  }

  getAncestorRow(level) {
    assert(level >= 0);
    if (level === 0) return null;
    return new Path(this.hierarchy.slice(0, level));
  }

  getIndicatedLevel(offset, options) {
    return this.getLevel() + Math.round(offset / options.levelWidth);
  }

  static getChild(parent, index, positionInRow) {
    let hierarchy = parent ? parent.hierarchy : [];
    return new Path(hierarchy.concat([index]), positionInRow);
  }

  static equal(first, second) { return first.id === second.id; }
}
