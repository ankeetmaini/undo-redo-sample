import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import UndoRedo from "./UndoRedo";
class App extends Component {
  constructor() {
    super();
    this.undoRedo = UndoRedo();
    this.state = this.undoRedo.do({ count: 0 });
  }

  componentDidMount() {
    document.addEventListener("keydown", e => {
      if (e.key === "z" && e.metaKey && !e.shiftKey) {
        const c = this.undoRedo.undo();
        this.setState(c);
      }
      if (e.key === "z" && e.metaKey && e.shiftKey) {
        const c = this.undoRedo.redo();
        this.setState(c);
      }
    });
  }

  increment = () => {
    this.setState(old => {
      const count = old.count + 1;
      this.undoRedo.do({ count });
      return { ...old, count };
    });
  };

  decrement = () => {
    this.setState(old => {
      const count = old.count - 1;
      this.undoRedo.do({ count });
      return { ...old, count };
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">Counter: {this.state.count}</p>
        <button style={{ padding: 10, fontSize: 30 }} onClick={this.decrement}>
          -
        </button>{" "}
        <button style={{ padding: 10, fontSize: 30 }} onClick={this.increment}>
          +
        </button>
      </div>
    );
  }
}

export default App;
