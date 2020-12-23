const runConcurrent = require('./runConcurrent')
const tasks = [
  // 1. Each async task should accept a callback
  (done) => setTimeout(done, 500),
  (done) => setTimeout(done, 500),
  (done) => setTimeout(done, 500),
];

console.log('Let\'s go:')

runConcurrent(
  tasks,
  ({ taskIndex }) => {
    console.log(`Ran ${taskIndex}`);
  },
  () => {
    console.log('done !')
  }
)