import { AbstractRegistry }  from 'droplet-core';

export class TreeDefaultRegistry extends AbstractRegistry {

  constructor(tree, options) {
    super();
    this.options = options;
  }

  // Build targets

  getTargets(sourceId) {
    return [{original: null, x: 0, y: 0, width: 5000, height: 5000}];
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
