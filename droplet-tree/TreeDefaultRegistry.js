import { AbstractRegistry } from 'droplet-core';
import { BuildTargetAreas } from './iterator/BuildTargetAreas';
import { TransformTree } from './iterator/TreeTransformer';

export class TreeDefaultRegistry extends AbstractRegistry {

  constructor(root, tree, options) {
    super();
    this.options = options;
    this.tree = tree;
    this.root = root;
  }

  setTree(tree) {
    this.tree = tree;
  }

  getTargets(sourceId) {
    return new BuildTargetAreas().start(this.tree, this.options);
  }

  hover(matches, begin, current) {
    let preview = null;
    if (matches.length) {
      let hover = matches[0].preview(current.x - begin.x);
      preview = this.options.getPreview(hover);
    }
    this.root.setState({preview});
  }

  drop(matches, begin, current) {
    this.root.setState({preview: null});
    if (!matches.length) return;
    let transformation = {};
    new TransformTree().transform(this.tree, this.options, transformation);
  }

  setSelected(sourceId) {
    this.options.onSelectChange(sourceId, true);
    return () => this.options.onSelectChange(sourceId, false);
  }
}
