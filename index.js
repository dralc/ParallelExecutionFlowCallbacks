const { runConcurrentLimit } = require('./runConcurrent')
const tasks = [
  // 1. Each async task should accept a callback called 'done'
  (done) => {
    setTimeout(
      () => done(null, 1, 2),
      1000)
  },
  (done) => {
    setTimeout(
      () => done(null, { msg: 'hi'}),
      1000)
  },
  (done) => {
    setTimeout(
      () => done(new Error('My error here')),
      1500)
  },
  (done) => {
    setTimeout(
      () => done(null, 'foo', 'baz'),
      500)
  },
];

console.log('Let\'s go:')

runConcurrentLimit(
  tasks,
  2,
  // Task done callback
  ({ taskIndex, results, error }) => {
    console.log(
      `Ran task ${taskIndex} |`,
      results.length ? 'results:' : '', results.length ? results : '',
      error ? `${error.message}` : ''
    )
  },
  // All tasks done callback
  () => {
    console.log('all tasks done !')
  }
)
