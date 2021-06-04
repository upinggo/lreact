/*
 * @Author: your name
 * @Date: 2021-06-03 18:04:29
 * @LastEditTime: 2021-06-04 10:11:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lreact\src\lreact\index.js
 */
function render(vnode, container) {
  console.log("🚀 ~ file: react-dom.js ~ line 10 ~ render ~ vnode,root", vnode);
  const node = createNode(vnode);
  container.appendChild(node);
}
const createNode = (vnode) => {
  let node;
  return;
};
export default { render };
