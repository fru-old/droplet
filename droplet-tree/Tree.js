import { h, Component } from 'preact';
import { TreeDefaultRegistry } from './TreeDefaultRegistry';
import { TreeDefaultOptions } from './TreeDefaultOptions';
import style from './style.scss';

let rows = (rows, root) => rows.map(x => <TreeRow row={x} root={root} />);

export class Tree extends Component {

  constructor(props) {
    super();
    let {id, tree, options, registry} = props;
    this.options  = new TreeDefaultOptions(options || {});
    this.registry = registry || new TreeDefaultRegistry(this, tree, this.options);
    this.ref = (e) => this.registry.connectRoot(id || 'droplet-tree-root', e);
  }

  render() {
    let {x, y, width, height} = this.state.preview || {};
    let preview = { top: y, left: x, width, height };
    return <div><ul className="tree-root" ref={this.ref}>
      {rows(this.props.tree, this)}
    </ul><div className="highlight" style={preview}></div></div>;
  }
}

export class TreeRow extends Component {

  updateDomReference(multi, root, dom) {
    if (this.undoPreview) this.undoPreview();

    if (multi.length === 1) {
      let id = root.options.getId(multi[0]);
      this.undoPreview = root.registry.connectPreview(id, dom);
    }
  }

  componentWillUnmount() {
    if (this.undoPreview) this.undoPreview();
  }

  render() {
    let {row, root} = this.props;

    let multi = root.options.getMultiList(row);
    let children = rows(root.options.getChildList(row), root);
    let elements = multi.map(n => <TreeElement node={n} root={root} />);

    let ref = this.updateDomReference.bind(this, multi, root);
    return <li ref={ref}>{elements}<ul>{children}</ul></li>;
  }
}

export class TreeElement extends Component {

  updateDomReference(node, root, dom) {
    if (this.undoSource) this.undoSource();

    let id = root.options.getId(node);
    this.undoSource = root.registry.connectSource(id, dom);
  }

  componentWillUnmount() {
    if (this.undoSource) this.undoSource();
  }

  render() {
    let {node, root} = this.props;
    let content = root.options.getContent(node);
    let ref = this.updateDomReference.bind(this, node, root);

    return <span className="tree-element" ref={ref}>{content}</span>;
  }
}
