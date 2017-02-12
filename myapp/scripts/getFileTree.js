var fs=require("fs");
var EventEmitter=require("events").EventEmitter;
var event=new EventEmitter();
var obj={};

var floor=0;
var troot="";
obj.walk=eachFile;
obj.on=event.on;
obj.emit=event.emit;
function walk(path,file,noeach) {  
	
	if(file==null){
		file={};
		file.name="root";
		file.path=path;
		file.child=[];
		obj.emit('dir',path);
	}

    floor++;  
    var files=fs.readdirSync(path);

    files.forEach(function(item) {  
        var tmpPath = path + '/' + item;  
        var temfile={
        	name:item,
        	path:tmpPath,
        	child:[]
        };
        if(file.child)
        file.child.push(temfile);
        var stats= fs.statSync(tmpPath)  ;
        for (var i in noeach) {
                if(item==noeach[i]){
                  stats=null;
            }
        }; 
        if (stats&&stats.isDirectory()) { 
            
        	obj.emit('dir',tmpPath,item);
            walk(tmpPath,temfile,noeach); 
        } else {  
        	obj.emit('file',tmpPath,item);
        }  
        
        
    });  

  	obj.emit('end',file)
  	return file;
};  


function eachFile(path,noeach) {
	troot=path;
	var result=walk(path,null,noeach);
	floor=0;
	return result;
    
}

  
module.exports=obj;