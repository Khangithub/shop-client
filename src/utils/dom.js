const backToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
const scrollToBottom = selector => {
  const ele = document.querySelector (selector);
  ele.scrollTo (0, ele.scrollHeight);
};
export {backToTop, scrollToBottom};
