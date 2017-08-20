class AbstractReverseIterator {

  isSelected(node, options) {
    return options.isSelected(options.getIndex(node));
  }

  private iterateReverse(rows, parentPath, options) {
    if (!rows) return;
    for(let i = rows.length - 1; i >= 0; i--) {
      let row = rows[i];
      let rowPath = Path.getChild(parentPath, i);

      let nodes    = options.getMultiList(row);
      let children = options.getChildList(row);
      let selected = nodes.every(n => this.isSelected(n, options));

      if (!selected) {
        this.iterateReverse(children, rowPath, options);
      }

      if (this.enterRow) this.enterRow(row, rowPath, selected);
      for(let j = nodes.length - 1; j >= 0; j--) {
        let node = nodes[j];
        let path = Path.getChild(parentPath, i, j);

        this.visitNode(node, path, this.isSelected(node, options), options);
      }
      if (this.exitRow) this.exitRow(row, rowPath, selected);
    }
  }
}
