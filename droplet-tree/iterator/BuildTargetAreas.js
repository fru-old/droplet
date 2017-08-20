class BuildTargetAreas extends AbstractReverseIterator {

  targets = [];
  start(tree, options) {
    this.iterateReverse(tree, null, options);
    return this.targets;
  }

  notSetBefore = [];
  enterRow(row, path, selected) {
    if (selected) return;
    this.notSetBefore.forEach(c => c.beforePath = path);
    this.notSetBefore = [];
  }

  previous = null;
  exitRow(row, path, selected) {
    if (!selected) this.previous = path;
  }

  visitNode(node, path, selected, options) {
    let targets = this.buildTargetAreas(node, path, selected, options);
    this.notSetBefore = this.notSetBefore.concat(targets);
    targets.forEach(c => c.afterPath = this.previous);
    this.targets = this.targets.concat(targets);
  }

  buildTargetAreas (node, path, selected, options) {
    // Generated with buildTargets from options.getBoundBox(node);
    return [];
  }
}
