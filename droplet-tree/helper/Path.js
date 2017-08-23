import assert from 'assert';

class Path {
  constructor(hierarchy, positionInRow) {
    assert(hierarchy && hierarchy.length);
    assert(positionInRow === undefined || positionInRow >= 0)
    this.hierarchy = hierarchy;
    this.positionInRow = positionInRow;
    this.id = hierarchy.join('-') + '_' + positionInRow;
  }

  private getLevel() { return this.hierarchy.length; }
  private getIndex() { return this.hierarchy[this.hierarchy.length - 1]; }
  private getParentRow() {
    return this.getAncestorRow(this.getLevel() - 1);
  }

  private getAncestorRow(level) {
    assert(level >= 0);
    if (level === 0) return null;
    return new Path(this.hierarchy.slice(0, level));
  }

  private getIndicatedLevel(offset, options) {
    return this.getLevel() + Math.round(offset / options.levelWidth);
  }

  static getChild(parent, index, positionInRow) {
    let hierarchy = parent ? parent.hierarchy : [];
    return new Path(hierarchy.concat([index]), positionInRow);
  }

  static equal(first, second) { return first.id === second.id; }
}
