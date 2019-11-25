const prettier = require("prettier");
const posthtml = require("posthtml")

let plugin = require('../lib/index.js')

async function run(input, output, opts = {}) {
  output = format(output)
  let result = await posthtml([
    plugin(opts)
  ]).process(input);

  const html = format(result.html)

  expect(html).toBe(output)
}


function format(css) {
  return prettier.format(css, { parser: 'html' })
}

it('add class', async () => {
  await run(`<div class="test"></div>`, `<div class="test test2"></div>`, {
    walk(node) {
      if (node.attrs && node.attrs.class) {
        node.attrs.class += ' test2'
      }
      return node
    }
  })
});

it('change class', async () => {
  await run(`<div class="test"></div>`, `<div class="test2"></div>`, {
    walk(node) {
      if (node.attrs && node.attrs.class) {
        node.attrs.class = 'test2'
      }
      return node
    }
  })
});

it('async task', async () => {
  await run(`<div class="test"></div>`, `<div class="test2"></div>`, {
    async walk(node) {
      if (node.attrs && node.attrs.class) {
        node.attrs.class = await findTargetClass(node.attrs.class);
      }
      return node
    }
  });

  async function findTargetClass() {
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle('test2')
      }, 100);
    })
  }
})
