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
    var rows = this.tree.map(x => <TreeRow row={x} root={this} />);
		return <ul className="tree-root">{rows}</ul>;
	}
}

export class TreeRow extends Component {
  addNativeNode(node, context) {
    console.log(arguments);
  }
  render () {
    var elements = [
      <span className="tree-element"
            ref={node => this.addNativeNode(node, this.props.row)}>
        {this.props.row.title}
      </span>
    ];
    var children = (this.props.row.children || []).map(x => {
      return <TreeRow row={x} root={this.props.root} />
    });
    return <li>{elements}<ul>{children}</ul></li>;
  }
}
