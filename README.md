<div align="center">
<h2>small-queue</h2>

[![NPM version](https://img.shields.io/npm/v/small-queue.svg?style=flat-square)](https://www.npmjs.com/package/small-queue)

</div>

Simple queue manipulation tool.

### Demo

```js
import { Queue } from 'small-queue';

const q = new Queue();

q.add((next) => {
  console.log(1);
  setTimeout(() => {
    next();
  })
})

q.add((next) => {
  console.log(2);
})

// Wait for the current queue to finish executing
q.awaitFinish().then(() => {
  console.log(4);

  // Restart
  q.add((next) => {
    console.log(1);
    next();
  })
})
```

### CDN

```html
<!DOCTYPE html>
<html lang="en">
<body>
  <script src="https://unpkg.com/small-queue/dist/queue.umd.js"></script>
  <script>
    const { Queue } = window.SQ;
    const q = new Queue();

    // ...
  </script>
</body>
</html>
```