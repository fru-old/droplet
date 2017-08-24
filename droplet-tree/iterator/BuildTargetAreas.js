import { AbstractReverseIterator } from './AbstractReverseIterator';
import { buildTargets } from '../helper/targets';
import { getHoverInfo } from '../helper/hover';

export class BuildTargetAreas extends AbstractReverseIterator {

  results = [];
  incomplete = {
    prev: [],
    prevNotSelected: [],
    currentRow: []
  };
  history = {
    next: null,
    nextNotSelected: null
  }

  start(tree, options) {
    this.iterateReverse(tree, null, options);
    return this.results;
  }
  set(array, call) { array.forEach(call); array.length = 0; }
  add(array, targets) { array.push.apply(array, targets); }

  // New rows is assigned as prev and possibly prevNotSelected

  enterRow(row, path, selected) {
    this.set(this.incomplete.prev, x => x.prev = {path, row});
    if (selected) return;
    this.set(this.incomplete.prevNotSelected, x => x.prevNotSelected = {path, row});
  }

  // On every exit we can assign the history and then make this row history

  exitRow(row, path, selected) {
    this.set(this.incomplete.currentRow, x => {
      x.next = this.history.next;
      x.nextNotSelected = this.history.nextNotSelected;
    });

    this.history.next = {path, row};
    if (!selected) this.history.nextNotSelected = {path, row};
  }

  visitNode(node, path, selected, options) {
    let targets = this.buildTargetAreas(node, path, selected, options);
    this.add(this.results, targets);
    this.add(this.incomplete.prev, targets);
    this.add(this.incomplete.prevNotSelected, targets);
    this.add(this.incomplete.currentRow, targets);
  }

  buildTargetAreas(node, path, selected, options) {
    var box = options.getBoundingBox(node);
    var leftSpacing = options.getLeftSpacing(node, path);
    var sections = buildTargets(box, options, path.isFirstInRow() ? leftSpacing : 0);

    function preview(direction, offset) {
      let before = this.prev && this.prev.path;
      let after  = this.next && this.next.path;
      let info = getHoverInfo(path, before, after, offset, options);

      return {levelDifference: info.level - path.getLevel(), box, direction, selected};
    }

    sections.top.preview = preview.bind(sections.top, 0);
    sections.bottom.preview = preview.bind(sections.bottom, 2);
    return [sections.top, sections.bottom];
  }
}
