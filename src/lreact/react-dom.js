/*
 * @Author: your name
 * @Date: 2021-06-03 18:04:29
 * @LastEditTime: 2021-06-04 17:59:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lreact\src\lreact\index.js
 */
function render(vnode, container) {
  const node = createNode(vnode);
  container.appendChild(node);
}
const createNode = (vnode) => {
  const { type } = vnode;
  // let node;
  // if (typeof type === "string") {
  //   node = updateHostComponent(vnode);
  // } else if (typeof type === "function") {
  //   node = type.prototype.isReactComponent
  //     ? updateClassComponent(vnode)
  //     : updateFunctionComponent(vnode);
  // } else {
  //   node = updateTextComponent(vnode);
  // }
  const node = document.createElement(type);
  return node;
};
//文本节点
const updateTextComponent = (vnode) => {
  return document.createTextNode(vnode);
};
//原生节点
const updateHostComponent = (vnode) => {
  const { type, props } = vnode;
  if (!vnode.stateNode) {
    vnode.stateNode = createNode(vnode);
  }
  // const node = document.createElement(type);
  // updateNode(node, props);
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
//下一个任务的全局变量
let nextUnitOfWork = null;
//workUnit其实就是fiber
// child
// sibling
// return
const performUnitOfWork = (workUnit) => {
  const { type } = workUnit;
  if (typeof type === "string") {
    updateHostComponent(workUnit);
  }
  //return 下一个节点
  if (workUnit.child) return workUnit.child;
  let nextFiber = workUnit;
  //找到他的祖先节点的兄弟节点
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
};
const commitRoot = () => {};
const workLoop = (IdleDeadline) => {
  console.log(
    "🚀 ~ file: react-dom.js ~ line 81 ~ workLoop ~ IdleDeadline",
    IdleDeadline
  );
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  //完成更新&&提交fiber
  if (!nextUnitOfWork) {
    commitRoot();
  }
  // nextUnitOfWork = null;
};
requestIdleCallback(workLoop);
export default { render };
