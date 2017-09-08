import React, { Component } from 'react';
import { Tree } from 'droplet-tree';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tree: [
        {id: 1, title:'1'},
        {id: 2, title:'2', children: [
          {id: 3, title:'2.1'}
        ]}
      ]
    };
  }

  render() {
    return (
      <div className="App">
        <Tree tree={this.state.tree} onChange={(x) => this.setState({tree: x})}></Tree>
      </div>
    );
  }
}

export default App;
