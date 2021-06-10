/*
 * @Author: your name
 * @Date: 2021-06-03 18:01:57
 * @LastEditTime: 2021-06-10 10:48:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lreact\src\index.js
 */
import React from "react";
import ReactDOM from "./lreact/react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const jsx = (
  <div className="a">
    <code>123</code>
    <span>这是span标签</span>
    <h1>这是h1标签</h1>
  </div>
);
ReactDOM.render(<App className="a" />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
console.log(React.version);
