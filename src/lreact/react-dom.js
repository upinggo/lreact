/*
 * @Author: your name
 * @Date: 2021-06-03 18:04:29
 * @LastEditTime: 2021-06-04 13:59:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lreact\src\lreact\index.js
 */
function render(vnode, container) {
  const node = createNode(vnode);
  container.appendChild(node);
}
const createNode = (vnode) => {
  let node;
  const { type } = vnode;
  if (typeof type === "string") {
    node = updateHostComponent(vnode);
  } else if (typeof type === "function") {
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else {
    node = updateTextComponent(vnode);
  }
  return node;
};
//文本节点
const updateTextComponent = (vnode) => {
  return document.createTextNode(vnode);
};
//原生节点
const updateHostComponent = (vnode) => {
  const { type, props } = vnode;
  const node = document.createElement(type);
  updateNode(node, props);
  //reconcile
  reconcileChildren(node, props.children);
  return node;
};
//函数组件
const updateFunctionComponent = (vnode) => {
  const { type, props } = vnode;
  const vvnode = type(props);
  return createNode(vvnode);
};
//类组件
const updateClassComponent = (vnode) => {
  const { type, props } = vnode;
  const instance = new type(props);
  console.log(
    "🚀 ~ file: react-dom.js ~ line 50 ~ updateClassComponent ~ instance",
    instance
  );
  const vvnode = instance.render();
  console.log(
    "🚀 ~ file: react-dom.js ~ line 55 ~ updateClassComponent ~ vvnode",
    vvnode
  );
  return createNode(vvnode);
};
//更新属性
const updateNode = (node, nextVal) => {
  // console.log(
  //   "🚀 ~ file: react-dom.js ~ line 39 ~ updateNode ~ node, nextVal",
  //   node,
  //   nextVal
  // );
  Object.keys(nextVal)
    .filter((key) => key !== "children")
    .forEach((props) => (node[props] = nextVal[props]));
};
const reconcileChildren = (parentNode, children) => {
  //单children在props.children下是一个对象
  const newChildren = Array.isArray(children) ? children : [children];
  for (let i = 0; i < newChildren.length; i++) {
    let children = newChildren[i];
    render(children, parentNode);
  }
};
export default { render };
