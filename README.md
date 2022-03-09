# Set Scrollbar Width

A small JS library to calculate the scrollbar width and inject it into the browser as a CSS variable.

Used to accompany https://github.com/LucidNinja/tailwind-container-break-out, to get the width of scrollbars, since each browser and OS handles this differently. This package can be used standalone.

## Installation

`npm i set-scrollbar-width`

## QuickStart

Import `setScrollbarWidth` into your app and run on page mount.

## In JS

In NextJs, this could look like this

```

// _app.js

import { useEffect } from 'react';
import setScrollBarWidth from 'set-scrollbar-width';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    setScrollbarWidth();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
```

You can also set the CSS variable name, if not using with [Tailwind Container Break Out](https://github.com/LucidNinja/tailwind-container-break-out).

```
  setScrollbarWidth('--my-css-var');
```

### In CSS

```
// eg. Making a div the true width of the viewport

div {
  width: calc((100vw - var(--twcb-scrollbar-width)));
}
```

```
// eg. Breaking out of a container div that is 1078px wide, using a 'negative margin hack', 
// in order to emulate a full width div inside of a boxed div.

.wider-than-container {
  margin-left: calc((-100vw + var(--twcb-scrollbar-width)) / 2 + 1078 / 2 );
  margin-right: calc((-100vw + var(--twcb-scrollbar-width)) / 2 + 1078 / 2 );
}
```

## Rationale

As per the CSS spec (https://www.w3.org/TR/css-values-3/#viewport-relative-lengths), the `vw` unit assumes that scrollbars do not exist. This helper package calculates the scrollbar width using Javascript event listeners, allowing you to use `--twb-scrollbar-width` (or your own variable name), inside of CSS.

### Can't this just be handled with CSS?

There are cases when this can work. EG:

```
body {
  width: calc(100vw - (100vw - 100%));
}
```

However, this only works on the body or elements that are as wide as the body. Hence, we need to revert to CSS variables. However, a CSS variable is a reusable piece of math that isn't computed until it is used. If used on the body, then the `100%` in this calculation uses the body's width (which is generally the viewport width), but if used inside a nested div that isn't the full width of the viewport, then the `100%` referes to the width of the inner element.

See https://stackoverflow.com/questions/33606565/is-it-possible-to-calculate-the-viewport-width-vw-without-scrollbar for more discussion on this topic.