/**
 * Concurrently runs the functions in <collection>.
 * 
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
