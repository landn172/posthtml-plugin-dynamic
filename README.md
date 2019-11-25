# posthtml-plugin-dynamic

------------------------

posthtml plugin get a ability for dynamic add change node.

# Install

```sh
npm i --save-dev posthtml-plugin-dynamic
```

## Usage

posthtml.config.js

```js
module.exports = {
  walk(node) {
    // you can  dynamic change the node
    // support return Promise<node>
    return node
  }
} 
```

