# hello-color

http://jxnblk.com/hello-color

[![Build Status](https://travis-ci.org/jxnblk/hello-color.svg?branch=master)](https://travis-ci.org/jxnblk/hello-color)

```sh
npm i hello-color
```

```js
import hello from 'hello-color'

const result = hello('#0fc')
// Returns an object with negated and adjusted color
// that meets a minimum contrast
// {
//   base: '#00ffcc',
//   color: '#f6002d',
//   contrast: 3.2636058745832304,
//   dark: false
// }
```

MIT License
