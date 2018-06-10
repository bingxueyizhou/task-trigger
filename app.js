/*
  app start script
*/
var taskmgr = require("./taskmgr")
var trigger = require("./trigger")
var schedule = require("node-schedule");

/**
* sleep module.
*/
var SLEEP_INTERVAL = 1000*60*60
var sleep_do       = null
function sleep_loop(){
  if ( typeof(sleep_do) == 'function' ){
    sleep_do()
  }
  setTimeout(sleep_loop, SLEEP_INTERVAL)
}

/**
* script main function
*/
function main(){
  taskmgr.init()
  trigger.init()
  __tmplist = []

  sleep_do = ()=>{
    __tmplist.forEach((item,index)=>{
        item.cancel()
    })
    __tmplist = []
    taskmgr.read_task_list()
    taskmgr.getlist().forEach((item,index)=>{
      if (item.type == taskmgr.TASK_TYPE_LOCAL){
          var j = schedule.scheduleJob(item.time, ()=>{
              trigger.sh(item.name, item.op, item.output)
          })
          __tmplist.push(j)
      }else if (item.type == taskmgr.TASK_TYPE_REMOTE){
          var j = schedule.scheduleJob(item.time, ()=>{
              trigger.act(item.name, item.op, item.method, item.data)
          })
          __tmplist.push(j)
      }
    })
  }
  sleep_loop()
}


main();
