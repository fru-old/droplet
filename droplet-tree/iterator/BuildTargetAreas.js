import { AbstractReverseIterator } from './AbstractReverseIterator';
import { buildTargets } from '../helper/targets';
import { getHoverInfo } from '../helper/hover';

export class BuildTargetAreas extends AbstractReverseIterator {

  targets = [];
  start(tree, options) {
    this.iterateReverse(tree, null, options);
    return this.targets;
  }

  notSetBefore = [];
  enterRow(row, path, selected) {
    if (selected) return;
    this.notSetBefore.forEach(c => c.beforePath = path);
    this.notSetBefore = [];
  }

  previous = null;
  exitRow(row, path, selected) {
    if (!selected) this.previous = path;
  }

  visitNode(node, path, selected, options) {
    let targets = this.buildTargetAreas(node, path, selected, options);
    this.notSetBefore = this.notSetBefore.concat(targets);
    targets.forEach(c => c.afterPath = this.previous);
    this.targets = this.targets.concat(targets);
  }

  buildTargetAreas(node, path, selected, options) {
    var box = options.getBoundingBox(node);
    var leftSpacing = options.getLeftSpacing(node, path);
    var sections = buildTargets(box, options, path.isFirstInRow() ? leftSpacing : 0);
    section.top.preview = () => showTopPreview('top',  )

    return [sections.top, secontions.bottom];
  }

  getPreview(path, box, section, direction, offset, options) {
    let before = section.beforePath;
    let after  = section.afterPath;
    let info = getHoverInfo(path, before, after, offset, options);
    
    return {level: info.level - path.getLevel(), box, direction};
  }
}
