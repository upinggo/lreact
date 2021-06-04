/*
 * @Author: your name
 * @Date: 2021-06-03 18:01:57
 * @LastEditTime: 2021-06-04 14:01:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lreact\src\App.js
 */
import logo from "./logo.svg";
import "./App.css";
import Component from "./lreact/Component";
class ClassComponent extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return <div>123{this.props.name}</div>;
  }
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ClassComponent name="name" />
      </header>
    </div>
  );
}

export default App;
