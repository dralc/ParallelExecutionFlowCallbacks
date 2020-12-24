/**
 * Concurrently runs the functions in <collection>.
 * 
 * @param {Array< (done)=>{} >} collection A list of tasks/functions to run. Each task should have a callback parameter called 'done' in the form (error, data1, data2, ...) => {}
 * @param {function({ taskIndex: number })} taskDoneCb A function to run after each function in <collection>
 * @param {function} allTasksDoneCb The function to run after the last function in <collection> has run
 */
module.exports = function runConcurrent(collection, taskDoneCb, allTasksDoneCb) {
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
