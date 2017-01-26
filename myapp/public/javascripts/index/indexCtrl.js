define(['app'],function (app) {
	app.controller('IndexCtrl',["$scope",function (scope) {
		scope.jum={
			content:"项目的出发点是利用nodejs在io读写中的天生优势，\
			对项目的构建过程中的成熟代码片段、工作流等内容进行构建！",
			title:"mill项目构建管理",
			btnVal:"按钮"
		}
	}])
})