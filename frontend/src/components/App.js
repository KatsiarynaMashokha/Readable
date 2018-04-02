import React, { Component } from 'react';
import '../App.css';
import Categories from './Categories';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Forum</h1>
        </header>
        <Categories />
      </div>
    );
  }
}

export default App;
