const getScrollbarWidth = (cssVariableName = '--twb-scrollbar-width') => {
  const prevWidth = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--twb-scrollbar-width');
  const newWidth = `${window.innerWidth - document.body.clientWidth}px`;

  if (newWidth !== prevWidth) {
    document.documentElement.style.setProperty(cssVariableName, newWidth);
  }
};

const setScrollbarWidth = () => {
  window.addEventListener('load', setScrollbarWidth);
  window.addEventListener('resize', setScrollbarWidth);
  getScrollbarWidth();
};

export default setScrollbarWidth;
