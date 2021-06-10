/*
 * @Author: your name
 * @Date: 2021-06-03 18:04:29
 * @LastEditTime: 2021-06-10 14:33:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lreact\src\lreact\index.js
 */
let root = null;
function render(vnode, container) {
  // const node = createNode(vnode);
  // container.appendChild(node);
  root = {
    type: "div",
    props: {
      children: { ...vnode },
    },
    stateNode: container,
  };
  nextUnitOfWork = root;
}
const createNode = (vnode) => {
  const { type, props } = vnode;
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
  updateNode(node, props);
  console.log("vnode", vnode);
  return node;
};
//文本节点
const updateTextComponent = (vnode) => {
  // return document.createTextNode(vnode);
  //真实节点
  if (!vnode.stateNode) {
    vnode.stateNode = document.createTextNode(vnode.props);
  }
};
//原生节点
const updateHostComponent = (vnode) => {
  const { type, props } = vnode;
  if (!vnode.stateNode) {
    //原生节点
    vnode.stateNode = createNode(vnode);
  }
  // const node = document.createElement(type);
  // updateNode(node, props);
  //reconcile
  reconcileChildren(vnode, props.children);
  // return node;
};
//函数组件
const updateFunctionComponent = (vnode) => {
  const { type, props } = vnode;
  //函数组件的子节点就是return的jsx生成的fiber对象
  reconcileChildren(vnode, type(props));
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
    // .filter((key) => key !== "children")
    .forEach((props) => {
      if (props === "children") {
        if (typeof nextVal[props] === "string") {
          node.textContent = nextVal[props];
        }
      } else {
        node[props] = nextVal[props];
      }
    });
};
const reconcileChildren = (parentNode, children) => {
  //文本标签直接返回
  if (typeof children === "string" || typeof children === "number") {
    return;
  }
  //单children在props.children下是一个对象
  const newChildren = Array.isArray(children) ? children : [children];
  let prevFiber = {};
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    let newFiber = {
      type: child.type,
      props: { ...child.props },
      stateNode: null,
      child: null,
      sibling: null,
      return: parentNode,
    };
    if (typeof child === "string") {
      newFiber.props = child;
    }
    //child就是生成的newFiber
    //因为第一个遍历生成的就是parentNode的child节点
    if (i === 0) {
      parentNode.child = newFiber;
    } else {
      prevFiber.sibling = newFiber;
    }
    //记录上一个fiber（js顺序执行的哦~）
    prevFiber = newFiber;
  }
};
//下一个任务的全局变量
let nextUnitOfWork = null;
//workUnit其实就是fiber
// child
// sibling
// return
const performUnitOfWork = (workUnit) => {
  //执行任务
  const { type } = workUnit;
  if (typeof type === "string") {
    updateHostComponent(workUnit);
  } else if (typeof type === "function") {
    updateFunctionComponent(workUnit);
  } else if (typeof type === "undefined") {
    updateTextComponent(workUnit);
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
const commitRoot = () => {
  commitWorker(root.child);
  root = null;
};
const commitWorker = (workInProgress) => {
  if (!workInProgress) return;
  let parentFiber = workInProgress.return;
  //如果不是原生节点继续找父级节点
  while (!parentFiber.stateNode) {
    parentFiber = parentFiber.return;
  }
  //原生节点
  let parentNode = parentFiber.stateNode;
  if (workInProgress.stateNode) {
    parentNode.appendChild(workInProgress.stateNode);
  }
  commitWorker(workInProgress.child);
  commitWorker(workInProgress.sibling);
};
const workLoop = (IdleDeadline) => {
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  //完成更新&&提交fiber
  if (!nextUnitOfWork && root) {
    commitRoot();
  }
  // nextUnitOfWork = null;
};
requestIdleCallback(workLoop);
export default { render };
