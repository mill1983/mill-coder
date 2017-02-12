define(['app'],function (app) {
	/**
		主要负责对文件的搜索和查找
	*/
	app.controller('IndexCtrl',['$scope','$routeParams','$http',function (acope,params,http) {

		acope.name="mill";
		acope.code='\
			function  (argument) {\r\n\
				// body...\
			}\
		';
		acope.buttons=[
			{title:"保存",fun:"save"},
			{title:"全选",fun:""},
			{title:"插入",fun:""}
		];
		var editor = ace.edit("editor");
	    editor.setOptions({
	        enableBasicAutocompletion: true,
	        enableSnippets: true,
	        enableLiveAutocompletion: true
	    });
	    editor.setTheme("ace/theme/monokai");
	    editor.getSession().setMode("ace/mode/java");

	}])
})