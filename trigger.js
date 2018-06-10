var http        = require("http")
var triggerfile = require("fs")
var taskmgr     = require("./taskmgr")

var TRIGGERFILE_NAME = "data.json"
var TRIGGER_URL_HOST = "www.baidu.com"
var TRIGGER_URL_PATH = "/"

var SHELL_OUTPUT_SHOW   = "show"
var SHELL_OUTPUT_HIDDEN = "hidden"

var trigger = {
  __key:"",
  init:()=>{
    trigger.__read_key()
    console.log("task trigger initialized")
  },
  __read_key:()=>{
    try{
      var data = JSON.parse(triggerfile.readFileSync(TRIGGERFILE_NAME))
      if ( data.trigger != null && data.trigger.key != null){
        trigger.__key = data.trigger.key
      }else{
        trigger.__key = ""
      }
      //console.log(trigger.__key)
    }catch(e){
      console.error("trigger data loading failed. error:", e)
    }
  },
  __parse_url:(url)=>{
    var ret = {
      url:"",
      path:""
    }
    start  = url.indexOf("/");
    if ( -1 != start){
      ret.url    = op.substring(start)
      ret.path   = op.substring(start+1, op.length)
    }else{
      ret.url  = url
      ret.path = "/"
    }
    return ret
  },
  __options:(op, method, length)=>{
    u = trigger.__parse_url(op)
    return {
        host: u.url,
        path: u.path,
        method: method,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Content-Length':length
        }
    }
  },
  encrypt:(data)=>{
    return data
  },
  act:(name, op, method, task)=>{
    // encrypt
    task = trigger.encrypt(task)

    // send using http
    var options = trigger.__options(op, method, task.length)

    // set class request
    try{
        var req = http.request(options, (res)=>{
            res.setEncoding('utf8');
            if ( 200 == res.statusCode){
              console.log("task["+ name +"] send success.")
            }
        });
        // send act
        req.write(task);
        req.end();
    }catch(e){
        console.log("task["+ name +"] send failed.error:", e)
    }

    /*
    res.on('data',(data)=>{
        console.log("data:",data);
        // send success
        console.log("task["+ name +"] send success.")
    });
    req.on('error', function(e) {
      console.log("task["+ name +"] send success.error", e.message)
    });
    */
  },
  sh:(name, op, output)=>{
    var exec   = require('child_process').exec;
    exec(op, (err,stdout,stderr)=>{
        if(err){
            console.log("task["+ name +"] exec failed.error:"+stderr);
        } else {
            if (output == SHELL_OUTPUT_SHOW){
                console.log("task["+ name +"] exec success.output:");
                console.log(stdout);
            }else if(output == SHELL_OUTPUT_HIDDEN){
                console.log("task["+ name +"] exec success.");
            }
        }
    });
  }
}

exports = module.exports = trigger
