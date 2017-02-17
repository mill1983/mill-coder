define(['app'],function (app) {
	/**
		主要负责对文件的搜索和查找
	*/
	app.controller('IndexCtrl',['$scope','$routeParams','sessionKey','$http'
	,'aceContext',
		function (acope,params,sessionKey,http,aceContext) {

		acope.name="mill";
		acope.code='\
function  (argument) {\r\n\
	// body...\
\r\n\}\
';
		acope.editorNode={};
		acope.setEditorNode=function  (node) {
			acope.editorNode=node;
		}
		acope.message={
			title:"编辑代码片段",
			content:"代码片段管理"
		}

		acope.buttons=[
			{title:"保存",fun:"save"},
			{title:"缓存为模板",fun:"cachetpl"},
			{title:"显示模板内容",fun:"showcachetpl"},
			{title:"编辑配置",fun:"editConf"},
			{title:"保存配置",fun:"saveConf"},
			{title:"生成",fun:"generator"},
		];
		acope.code_buttons=[
			{title:"保存",fun:"save"},
			{title:"全选",fun:""},
			{title:"插入",fun:""}
		]
		var editor = ace.edit("editor");
	    editor.setOptions({
	        enableBasicAutocompletion: true,
	        enableSnippets: true,
	        enableLiveAutocompletion: true
	    });
	    editor.setTheme("ace/theme/monokai");
	    editor.getSession().setMode("ace/mode/javascript");
	    editor.commands.addCommand({ name: 'myCommand', bindKey: {win: 'Ctrl-S', mac: 'Command-M'}, exec: function(editor) { 
	    	alert("要保存了");
	    } });
	    aceContext.setEditor(editor);

	   
	    
	    acope.funcs={
			save:function () {
				if(!acope.editorNode.id)return;
				// acope.code=editor.getValue();
				acope.editorNode.code=sessionStorage.getItem(sessionKey.tplcatch);
				acope.editorNode.config=sessionStorage.getItem(sessionKey.mcodeConf);
				http.post('/mcode_db/update_code',{data:acope.editorNode}).
				then(function  (data) {
					console.log(data)
				})
				
			},
			cachetpl:function () {
				sessionStorage.setItem(sessionKey.tplcatch,editor.getValue());
				acope.code=sessionStorage.getItem(sessionKey.tplcatch);
				editor.setValue("")
				acope.message={
					title:"缓存成功",
					content:"模板缓存成功"
				}
			},
			showcachetpl:function () {
				editor.setValue(sessionStorage.getItem(sessionKey.tplcatch))
			},
			editConf:function () {
				editor.setValue(sessionStorage.getItem(sessionKey.mcodeConf))
			} ,
			saveConf:function () {
				sessionStorage.setItem(sessionKey.mcodeConf,editor.getValue());
				acope.code=sessionStorage.getItem(sessionKey.mcodeConf);
				editor.setValue("")
				acope.message={
					title:"成功",
					content:"配置保存成功"
				}
			},
			generator:function () {
				http.post("/mcode/create/code",{
					"tpl":sessionStorage.getItem(sessionKey.tplcatch),
					"conf":sessionStorage.getItem(sessionKey.mcodeConf)
				}).then(function (data) {
					sessionStorage.setItem(sessionKey.mcode,data.data);
					acope.code=data.data;
				})
			}

			

		};
		

	}])//enc controller
})