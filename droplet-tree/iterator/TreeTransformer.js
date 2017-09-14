import assert from 'assert';
import { AbstractReverseIterator } from './AbstractReverseIterator';

export class TransformTree extends AbstractReverseIterator {

  detached = [];

  transform(tree, options, info) {
    this.tree = options.getEditableCopy(tree);
    this.options = options;
    this.info = info;
    this.iterateReverse(this.tree, null, options);
    if (options.onChange) options.onChange(this.tree);
  }

  enterRow(item, options) {
    let rows = item.rows;
    let rowIndex = item.path.getIndex();

    if (item.selected) {
      this.detached.push(options.removeRow(rows, rowIndex));
    }
  }

  visitNode(node, row, path, selected, options, rows) {
    let multi = options.getMultiList(row);
    let nodeIndex = path.getNodeIndex();

    if (selected) {
      this.detached.push(options.removeNode(multi, nodeIndex));
    }
  }

  skipNodes({selected}) {
    return selected;
  }

  moveChildren(path, index) {

  }
}
