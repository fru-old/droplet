import { AbstractRegistry } from 'droplet-core';
import { BuildTargetAreas } from './iterator/BuildTargetAreas';
import { TransformTree } from './iterator/TreeTransformer';

export class TreeDefaultRegistry extends AbstractRegistry {

  constructor(root, tree, options) {
    super();
    this.tree = tree;
    this.options = options;
    this.root = root;
  }

  getTargets(sourceId) {
    return new BuildTargetAreas().start(this.tree, this.options);
  }

  hover(matches, begin, current) {
    if (!matches.length) return;
    let hover = matches[0].preview(current.x - begin.x);
    this.root.setState({preview: this.options.getPreview(hover)});
  }

  drop(matches, begin, current) {
    this.root.setState({preview: null});
    if (!matches.length) return;
    let transformation = {};
    new TransformTree().transform(this.tree, this.options, transformation);
  }

  setSelected(sourceId) {
    this.options.selected[sourceId] = true;
    return () => delete this.options.selected[sourceId];
  }
}
