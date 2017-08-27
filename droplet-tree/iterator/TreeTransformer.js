import assert from 'assert';
import { AbstractReverseIterator } from './AbstractReverseIterator';

export class TransformTree extends AbstractReverseIterator {

  transform(tree, options, transformation) {
    this.tree = tree;
    this.options = options;
    this.transformation = transformation;
    this.iterateReverse(tree, null, options);
  }

  visitNode(node, row, path, selected, options) {
    if (selected) {
      let multi = options.getMultiList(row);

      let rowIndex  = path.getIndex();
      let nodeIndex = path.getNodeIndex();
      options.removeNode(this.rows, multi, rowIndex, nodeIndex);
    }
  }

  enterRow({rows}) { this.rows = rows; }

  insertAtIndex(path, index) {

  }

  insertIntoRow(path, index) {

  }

  moveChildren(path, index) {

  }
}
