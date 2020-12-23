/**
 * Concurrently runs the functions in <collection>.
 * 
 * @param {Array< (done)=>{} >} collection A list of functions to run. Each function should have a callback parameter.
 * @param {function({ taskIndex: number })} taskDoneCb A function to run after each function in <collection>
 * @param {function} allTasksDoneCb The function to run after the last function in <collection> has run
 */
module.exports = function runConcurrent(collection, taskDoneCb, allTasksDoneCb) {
  let completedTasks = 0;
  
  for (let i = 0, task; task = collection[i]; i++) {
    task(() => {
      taskDoneCb({ taskIndex: i });
      if (++completedTasks === collection.length) {
        allTasksDoneCb()
      }
    })
  }
}
