/**
 * Concurrently runs the functions in <collection>.
 * 
 * * @param {Array} collection A list of functions to run
 * @param {function({ taskIndex: number })} callback A function to run after each function in <collection>
 * @param {function} finalCallback The function to run after the last function in <collection> has run
 */
module.exports = function runConcurrent(collection, callback, finalCallback) {
  let completedTasks = 0;
  
  for (let i = 0, task; task = collection[i]; i++) {
    task(() => {
      callback({ taskIndex: i });
      if (++completedTasks === collection.length) {
        finalCallback()
      }
    })
  }
}
