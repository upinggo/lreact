/*
 * @Author: your name
 * @Date: 2021-06-03 18:01:57
 * @LastEditTime: 2021-06-04 13:46:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lreact\src\index.js
 */
import React from "react";
import ReactDOM from "./lreact/react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const jsx = <div className="a">123</div>;
ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
console.log(React.version);
