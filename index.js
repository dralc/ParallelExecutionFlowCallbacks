const runConcurrent = require('./runConcurrent')
const tasks = [
  // 1. Each async task should accept a callback
  (cb) => setTimeout(cb, 1000),
  (cb) => setTimeout(cb, 1000),
  (cb) => setTimeout(cb, 1000),
];

runConcurrent(
  tasks,
  ({ taskIndex }) => {
    console.log(`Ran ${taskIndex}`);
  },
  () => {
    console.log('done !')
  }
)