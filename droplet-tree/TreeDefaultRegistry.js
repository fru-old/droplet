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
      // TODO There needs to be a hidden suggested level that starts at the first
      // target level
      // TODO Any movement is added to hidden suggested level
      // TODO At any position a movement of the level width in a single direction
      // should result in a change in the suggested level
      // TODO When a direction change is detected the hidden suggested level is
      // reduced by all additional levels of the previous continues motion that
      // didnt make a change
      let hover = matches[0].preview(current.x - begin.x);
      preview = this.options.getPreview(hover);
    }
    this.root.setState({preview});
  }

  drop(matches, begin, current) {
    this.root.setState({preview: null});
    if (!matches.length) return;
    let info = matches[0].info(current.x - begin.x);
    new TransformTree().transform(this.tree, this.options, info);
  }

  setSelected(sourceId) {
    this.options.onSelectChange(sourceId, true);
    return () => this.options.onSelectChange(sourceId, false);
  }
}
