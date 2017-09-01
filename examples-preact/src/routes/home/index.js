import { Component } from 'react';
import { Tree } from 'droplet-tree'

export default class Home extends Component {
	tree = [
		{id: 1, title:'1'},
		{id: 2, title:'2', children: [
			{id: 3, title:'2.1'}
		]}
	];
	render() {
		return <Tree tree={this.tree}></Tree>;
	}
}
