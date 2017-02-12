define(['app'],function (app) {
	/**
		主要负责对文件的搜索和查找
	*/
	app.controller('IndexCtrl',['$scope','$routeParams','$http',function (acope,params,http) {

		var editor = ace.edit("editor");
	    editor.setOptions({
	        enableBasicAutocompletion: true,
	        enableSnippets: true,
	        enableLiveAutocompletion: true
	    });
	    editor.setTheme("ace/theme/monokai");
	    editor.getSession().setMode("ace/mode/java");
	    // acope.content=params.url;
		http.post('/editor/content',{url:params.url}).then(
			function (data) {
				if(typeof(data.data)=="object")
				 editor.setValue(angular.toJson(data.data,true));
				else if (typeof(data.data)=="string") {
					editor.setValue(data.data);
				}
		})
		acope.buttons=[
			{title:"保存",fun:"save"},
			{title:"全选",fun:""},
			{title:"插入",fun:""}
		];
		acope.funcs={
			save:function () {
				if(confirm('是否保存文件')) 
				http.post('/editor/save',{
					url:params.url,
					content:editor.getValue()
				}).then(function (data) {
					alert(data.data)
				})
			}
			
		}
	   

	}])
})