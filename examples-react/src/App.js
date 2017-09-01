import React, { Component } from 'react';
import { Tree } from 'droplet-tree';

class App extends Component {
  tree = [
		{id: 1, title:'1'},
		{id: 2, title:'2', children: [
			{id: 3, title:'2.1'}
		]}
	];
  render() {
    return (
      <div className="App">
        <Tree tree={this.tree}></Tree>
      </div>
    );
  }
}

export default App;
