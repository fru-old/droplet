import { Path } from '../helper/Path';

export class AbstractReverseIterator {

  iterateReverse(rows, parentPath, options) {
    if (!rows) return;
    for(let i = rows.length - 1; i >= 0; i--) {
      let row = rows[i];
      let rowPath = Path.getChild(parentPath, i);

      let nodes    = options.getMultiList(row);
      let children = options.getChildList(row);
      let selected = nodes.every(n => options.isSelected(n));

      if (!selected) {
        this.iterateReverse(children, rowPath, options);
      }

      if (this.enterRow) this.enterRow({row, path: rowPath, selected, rows}, options);
      for(let j = nodes.length - 1; j >= 0; j--) {
        let node = nodes[j];
        let path = Path.getChild(parentPath, i, j);

        this.visitNode(node, row, path, options.isSelected(node), options, rows);
      }
      if (this.exitRow) this.exitRow({row, path: rowPath, selected, rows});
    }
  }
}
