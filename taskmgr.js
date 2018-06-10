var schedule = require("node-schedule");
var trigger  = require("./trigger")
var taskfile = require("fs")

var TASKFILE_NAME = "data.json"

/**
  cron task:
  '* * * * * *'
  Seconds Minutes Hours DayofMonth Month DayofWeek
  more info
  https://www.cnblogs.com/javahr/p/8318728.html
*/
var taskmgr = {
  __list:[],
  TASK_TYPE_LOCAL :"local",
  TASK_TYPE_REMOTE:"remote",
  SHELL_OUTPUT_SHOW  :"show",
  SHELL_OUTPUT_HIDDEN:"hidden",
  init:()=>{
    taskmgr.read_task_list()
    console.log("task manager initialized")
  },
  getlist:()=>{
    return taskmgr.__list
  },
  read_task_list:()=>{
    try{
      var data = JSON.parse(taskfile.readFileSync(TASKFILE_NAME))
      if ( data.tasklist != null ){
        taskmgr.__list = data.tasklist
      }else{
        taskmgr.__list = []
      }
      //console.log(taskmgr.__list)
    }catch(e){
      console.error("taskmgr data loading failed. error:", e)
    }
  }
}

exports = module.exports = taskmgr
