import assert from 'assert';
import { AbstractReverseIterator } from './AbstractReverseIterator';

export class TransformTree extends AbstractReverseIterator {

  detached = [];

  transform(tree, options, info) {
    this.tree = options.getEditableCopy(tree);
    this.options = options;
    this.info = info;
    this.iterateReverse(this.tree, null, options);

    if (this.rows) {
      for(let i = this.detached.length - 1; i >= 0; i--) {
        this.options.insertRow(this.rows, this.index, this.detached[i]);
      }
    }

    if (options.onChange) options.onChange(this.tree);
  }

  enterRow(item, options) {
    let rows = item.rows;
    let rowIndex = item.path.getIndex();

    if (item.selected) {
      this.detached.push(options.removeRow(rows, rowIndex));
    }

    let parent = this.info.beforePath && this.info.beforePath.getAncestorRow(this.info.level + 1);
    let isBeforeOfDrop = this.info.beforePath && item.path.id === this.info.beforePath.getRowId();

    if (isBeforeOfDrop && this.info.isFirstChildOfBefore) {
      this.rows  = this.options.getChildList(item.row, true);
      this.index = 0;
    } else if (item.path.id === (parent && parent.getRowId())) {
      this.rows  = item.rows;
      this.index = item.path.getIndex() + 1;
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
