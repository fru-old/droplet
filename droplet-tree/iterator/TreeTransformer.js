import assert from 'assert';
import { AbstractReverseIterator } from './AbstractReverseIterator';

export class TransformTree extends AbstractReverseIterator {

  transform(tree, options, transformation) {
    this.tree = options.getEditableCopy(tree);
    this.options = options;
    this.transformation = transformation;
    this.iterateReverse(this.tree, null, options);
    if (options.onChange) options.onChange(this.tree);
  }

  visitNode(node, row, path, selected, options, rows) {
    if (selected) {
      let multi = options.getMultiList(row);

      let rowIndex  = path.getIndex();
      let nodeIndex = path.getNodeIndex();
      options.removeNode(rows, multi, rowIndex, nodeIndex);
    }
  }

  insertAtIndex(path, index) {

  }

  insertIntoRow(path, index) {

  }

  moveChildren(path, index) {

  }
}
