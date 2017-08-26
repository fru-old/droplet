import { AbstractReverseIterator } from './AbstractReverseIterator';
import { buildTargets } from '../helper/targets';
import { getHoverInfo } from '../helper/hover';

export class BuildTargetAreas extends AbstractReverseIterator {

  start(tree, options) {
    this.iterateReverse(tree, null, options);
    return this.results;
  }
  set(array, call) { array.forEach(call); array.length = 0; }
  add(array, targets) { array.push.apply(array, targets); }

  visitNode(node, row, path, selected, options) {
    let targets = this.buildTargetAreas(node, row, path, selected, options);
    this.add(this.results, targets);
    this.add(this.incomplete.prev, targets);
    this.add(this.incomplete.prevNotSelected, targets);
    this.add(this.incomplete.currentRow, targets);
  }

  buildTargetAreas(node, row, path, selected, options) {
    let box = options.getBoundingBox(node);
    let leftSpacing = options.getLeftSpacing(node, path);
    let sections = buildTargets(box, options, path.isFirstInRow() ? leftSpacing : 0);

    function preview(direction, offset) {

      let prevNotSelected = this.prevNotSelected && this.prevNotSelected.path;
      let nextNotSelected = this.nextNotSelected && this.nextNotSelected.path;
      let info = getHoverInfo(path, prevNotSelected, nextNotSelected, offset, options);
      let levelDifference = info.level - path.getLevel();

      let centerPrev = direction === 0 && this.prev && this.prev.selected;
      let centerNext = direction === 2 && this.next && this.next.selected;

      let bounds = options.getRowBoundingBox(row);
      if (centerPrev) bounds = options.getRowBoundingBox(this.prev.row);
      if (centerNext) bounds = options.getRowBoundingBox(this.next.row);
      let center = selected || centerPrev || centerNext;

      return {levelDifference, bounds, direction, center};
    }

    sections.top.preview = preview.bind(sections.top, 0);
    sections.bottom.preview = preview.bind(sections.bottom, 2);
    return [sections.top, sections.bottom];
  }

  // State of the iterator

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

  // New rows is assigned as prev and possibly prevNotSelected

  enterRow(item) {
    this.set(this.incomplete.prev, x => x.prev = item);
    if (item.selected) return;
    this.set(this.incomplete.prevNotSelected, x => x.prevNotSelected = item);
  }

  // On every exit we can assign the history and then make this row history

  exitRow(item) {
    this.set(this.incomplete.currentRow, x => {
      x.next = this.history.next;
      x.nextNotSelected = this.history.nextNotSelected;
    });

    this.history.next = item;
    if (!item.selected) this.history.nextNotSelected = item;
  }
}
