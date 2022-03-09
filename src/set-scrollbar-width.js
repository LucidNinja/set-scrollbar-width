const getScrollbarWidth = (cssVariableName = '--twcb-scrollbar-width') => {
  const prevWidth = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(cssVariableName);
  const newWidth = `${window.innerWidth - document.body.clientWidth}px`;

  if (newWidth !== prevWidth) {
    document.documentElement.style.setProperty(cssVariableName, newWidth);
  }
};

const setScrollbarWidth = () => {
  window.addEventListener('load', getScrollbarWidth);
  window.addEventListener('resize', getScrollbarWidth);
  getScrollbarWidth();
};

module.exports = setScrollbarWidth;
