define(['app'],function (app) {
	app.controller('EditorCtrl',['$scope','$routeParams',function (scope,params) {
		var editor=ace.edit("editor");
	    editor.setOptions({
	        enableBasicAutocompletion: true,
	        enableSnippets: true,
	        enableLiveAutocompletion: true
	    });
	    editor.setTheme("ace/theme/monokai");
	    editor.getSession().setMode("ace/mode/javascript");
	    var test="\
	    function function_name(argument) {\r\n\
	    	// body...\r\n\
	    }\r\n\
	    ";
	    editor.insert(test);
	    //TODO这里可以放置原始内容
	    scope.content=params.content;
	}]);
})