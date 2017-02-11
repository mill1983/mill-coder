var fs=require('fs');
var mplug=require('mill-gulp-utils').mplug;
var gulp=require("gulp");
var promise=require("promise");
var path=require("path");
var gutil=require("gulp-util");
module.exports=function  (root,patten) {
    var pro=new promise(function (resolve,reject) {
        gulp.src(root+"/"+patten)
        .pipe(mplug(function  (gutil,file,enc,content) {
            var obj={};
            obj.name=file.relative;
            obj.dir=file.base;
            obj.path=file.path;
            result.push(obj);
            console.log(obj)
            return content;//需要返回content
        }));
    });
    
}