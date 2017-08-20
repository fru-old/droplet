import { h, Component } from 'preact';
import style from './style.scss';

export default class TreeRoot extends Component {
  tree = [
    {title: '1', id: 1},
    {title: '2', id: 2, children: [
      {title: '2.1', id: 3}
    ]}
  ];

	render() {
		return <ul className="tree-root">{rows(this.tree, this)}</ul>;
	}
}

function rows(rows, root) {
  return rows.map(x => <TreeRow row={x} root={root} />);
}

function TreeRow({row, root}) {
  let children = rows(row.children || [], root);
  let elements = [<TreeElement context={row} root={root} />];
  return <li>{elements}<ul>{children}</ul></li>;
};

export class TreeElement extends Component {
  addNativeNode(node, context) {
    console.log(arguments);
  }
  render () {
    return <span className="tree-element"
          ref={node => this.addNativeNode(node, this.props.context)}>
      {this.props.context.title} Test
    </span>;
  }
}
