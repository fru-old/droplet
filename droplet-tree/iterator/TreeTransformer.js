class TreeTransformer {
  insertPath, insertIndex, insertInline: true, movePath, moveIndex
}

class TransformTree extends ReverseIterator {

  start(tree, options, transformation) {
    this.iterateReverse(tree, null, options);
  }

  visitNode(node, row, path, selected, options) {

  }

  exitRow(row, path, selected) {
    if (selected) {} // detach row
  }

  insertAtIndex(path, index) {

  }

  insertIntoRow(path, index) {

  }

  moveChildren(path, index) {

  }
}
