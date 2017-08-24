import { AbstractRegistry } from 'droplet-core';
import { BuildTargetAreas } from './iterator/BuildTargetAreas';

export class TreeDefaultRegistry extends AbstractRegistry {

  constructor(root, tree, options) {
    super();
    this.tree = tree;
    this.options = options;
    this.root = root;
  }

  // Build targets

  getTargets(sourceId) {
    return new BuildTargetAreas().start(this.tree, this.options);
  }

  hover(matches, begin, current) {
    if (!matches.length) return;
    let hover = matches[0].preview(current.x - begin.x);
    this.root.setState({preview: this.options.getPreview(hover)});
  }

  drop(matches, begin, current) {
    if (!matches.length) return;
    console.log('drop');
  }

  setSelected(sourceId) {
    this.options.selected[sourceId] = true;
    return () => delete this.options.selected[sourceId];
  }
}
