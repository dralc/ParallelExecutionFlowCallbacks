/**
 * Concurrently runs the functions in <collection>.
 * 
 * @param {Array<Function(done)>} collection A list of tasks/functions to run. Each task should have a callback parameter called 'done' in the form (error, data1, data2, ...) => {}
 * @param {function({ taskIndex: number })} taskDoneCb A function to run after each function in <collection>
 * @param {function} allTasksDoneCb The function to run after the last function in <collection> has run
 */
function runConcurrent(collection, taskDoneCb, allTasksDoneCb) {
  let completedTasks = 0;
  
  for (let i = 0, task; task = collection[i]; i++) {
    // Implement the 'done' callback for a task
    task((error, ...val) => {
      const results = val
      taskDoneCb({ taskIndex: i, results, error });
      if (++completedTasks === collection.length) {
        allTasksDoneCb()
      }
    })
  }
}

/**
 * Concurrently runs the functions in <collection> with a concurrency limit
 * 
 * @param {Array<Function(done)>} collection A list of tasks/functions to run. Each task should have a callback parameter called 'done' in the form (error, data1, data2, ...) => {}
 * @param {number} concurrencyLimit
 * @param {function({ taskIndex: number })} taskDoneCb A function to run after each function in <collection>
 * @param {function} allTasksDoneCb The function to run after the last function in <collection> has run
 *
 */
function runConcurrentLimit(collection, concurrencyLimit, taskDoneCb, allTasksDoneCb) {
  if (collection.length === 0) {
    return allTasksDoneCb();
  }

  let tasksQueue = [...collection];
  let tasksNow = tasksQueue.splice(0, concurrencyLimit)

  runConcurrent(
    tasksNow,
    taskDoneCb,
    ()=>{
      // Start next batch of tasks after previous batch has all finished
      runConcurrentLimit(tasksQueue, concurrencyLimit, taskDoneCb, allTasksDoneCb);
    }
  )
}

module.exports = {
  runConcurrent,
  runConcurrentLimit
}