import { AbstractRegistry } from 'droplet-core';
import { BuildTargetAreas } from './iterator/BuildTargetAreas';

export class TreeDefaultRegistry extends AbstractRegistry {

  constructor(tree, options) {
    super();
    this.tree = tree;
    this.options = options;
  }

  // Build targets

  getTargets(sourceId) {
    return new BuildTargetAreas().start(this.tree, this.options);
  }

  hover(matches, begin, current) {
    console.log('hover');
  }

  drop(matches, begin, current) {
    console.log('drop');
  }

  setSelected(sourceId) {
    this.options.selected[sourceId] = true;
    return () => delete this.options.selected[sourceId];
  }
}
