module.exports = (config) => {
  const { walk = node => node } = config

  return (tree) => {
    const tasks = []
    tree.walk(node => {
      const task = Promise.resolve(walk(node));
      tasks.push(task)
      return node;
    });
    return Promise.all(tasks).then(() => tree)
  }
}