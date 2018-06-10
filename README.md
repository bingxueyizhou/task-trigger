# task-trigger
node.js 任务触发器。基于node-schedule的任务触发器，定时触发shell和rest接口


# how to use

node app.js


# data config
time format reference to https://github.com/node-schedule/node-schedule

eg.
{
  "tasklist":[
    {
      "id":1,
      "name":"log",
      "type":"local",
      "time":"*/5 * * * * *",
      "op":"df -h",
      "output":"hidden"
    },
    {
      "id":2,
      "name":"get baidu",
      "type":"remote",
      "time":"*/10 * * * * *",
      "op":"www.baidu.com",
      "method":"get",
      "data":"hello"
    }
  ],
  "trigger":{
    "key":""
  }
}
