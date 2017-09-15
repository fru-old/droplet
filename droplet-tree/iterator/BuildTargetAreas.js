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

  visitNode(node, row, path, selected, options, rows) {
    let targets = this.buildTargetAreas(node, row, path, selected, options, rows);
    this.add(this.results, targets);
    this.add(this.incomplete.prev, targets);
    this.add(this.incomplete.prevNotSelected, targets);
    this.add(this.incomplete.currentRow, targets);
  }

  buildTargetAreas(node, row, path, selected, options, rows) {
    let box = options.getBoundingBox(node);
    let leftSpacing = options.getLeftSpacing(node, path);
    let sections = buildTargets(box, options, path.isFirstInRow() ? leftSpacing : 0);
    let rowBounds = this.bounds;

    function info(direction, offset) {
      let prevNotSelected = this.prevNotSelected && this.prevNotSelected.path;
      let nextNotSelected = this.nextNotSelected && this.nextNotSelected.path;
      if (direction === 0 && !selected) nextNotSelected = path;
      if (direction === 2 && !selected) prevNotSelected = path;

      return getHoverInfo(path, prevNotSelected, nextNotSelected, offset, options);
    }

    function preview(direction, offset) {
      let info = this.info(offset);
      let levelDifference = info.level - path.getLevel();

      let centerPrev = direction === 0 && this.prev && this.prev.selected;
      let centerNext = direction === 2 && this.next && this.next.selected;

      let bounds = rowBounds;
      if (centerPrev) bounds = this.prev.bounds;
      if (centerNext) bounds = this.next.bounds;
      let center = selected || centerPrev || centerNext;

      return {levelDifference, bounds, direction, center};
    }

    sections.top.info = info.bind(sections.top, 0);
    sections.bottom.info = info.bind(sections.bottom, 2);

    sections.top.preview = preview.bind(sections.top, 0);
    sections.bottom.preview = preview.bind(sections.bottom, 2);

    let targets = [sections.top, sections.bottom];
    targets.forEach(x => x.level = path.getLevel());
    return targets;
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

  enterRow(item, options) {
    this.bounds = options.getRowBoundingBox(item.row);
    item.bounds = this.bounds;
    this.set(this.incomplete.prev, x => x.prev = item);
    if (item.selected) return;
    this.set(this.incomplete.prevNotSelected, x => x.prevNotSelected = item);
  }

  // On every exit we can assign the history and then make this row history

  exitRow(item) {
    item.bounds = this.bounds;
    this.set(this.incomplete.currentRow, x => {
      x.next = this.history.next;
      x.nextNotSelected = this.history.nextNotSelected;
    });

    this.history.next = item;
    if (!item.selected) this.history.nextNotSelected = item;
  }
}
