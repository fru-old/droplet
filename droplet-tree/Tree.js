import React, { Component } from 'react';
import { TreeDefaultRegistry } from './TreeDefaultRegistry';
import { TreeDefaultOptions } from './TreeDefaultOptions';
import style from './style.scss';

let rows = (rows, root) => {
  let options = root.options;
  return rows.map(x => <TreeRow row={x} root={root} key={options.getRowId(x)} />);
}

export class Tree extends Component {

  constructor(props) {
    super(props);
    let {id, tree, registry} = props;

    this.state = {};
    this.options  = new TreeDefaultOptions(props);
    this.registry = registry || new TreeDefaultRegistry(this, tree, this.options);
    this.ref = (e) => this.registry.connectRoot(id || 'droplet-tree-root', e);
  }
  
  componentDidUpdate(props) {
    if (this.props.tree === props.tree) return;
    this.options.setProps(props);
    this.registry.setTree(props.tree);
  }

  render() {
    let preview, {x, y, width, height} = this.state.preview || {};
    let highlight = { top: y, left: x, width, height };
    if (this.state.preview) {
      preview = <div className="highlight" style={highlight}></div>;
    }
    return <div ref={this.ref}><ul className="tree-root">
      {rows(this.props.tree, this)}
    </ul>{preview}</div>;
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
    let elements = multi.map(n =>
      <TreeElement node={n} root={root} key={root.options.getId(n)} />);

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
