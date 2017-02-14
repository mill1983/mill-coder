define(['app'],function (app) {
	app.controller('treeCtrl',['$scope','$http','$routeParams','tree2arr','treeContext'
		,function (scope,http,params,tree2arr,treeContext) {
		var currentNode={};
		scope.treeOptions = {
		    nodeChildren: "child",
		    dirSelectable: true,
		    injectClasses: {
		        ul: "a1",
		        li: "a2",
		        liSelected: "a7",
		        iExpanded: "a3",
		        iCollapsed: "a4",
		        iLeaf: "a5",
		        label: "a6",
		        labelSelected: "a8"
		    }
		}
		//模态框初始化
		scope.modal={
	    	id:"myModal",
	    	title:"创建模块",
	    	show:true
	    }
		http.get("/mcode/getmcodes").then(function (data) {
			var tree=tree2arr.arr2tree(data.data);
			scope.dataForTheTree=tree;

		});
		scope.buttonClick = function($event, node) {
			// location.goPath(node,0);
			$event.stopPropagation();
	     };
	   //右键点击事件
	    scope.markme=function (e,node) {
	    	currentNode=node;
	    };
    	scope.dataForTheTree=[];
	  	//为右键菜单注册点击事件
		treeContext.setContextFunc({
			createModel:function (id) {//创建模块
				$("#treeModal").modal("show")
				alert(currentNode.name);
			}
		});
		
		
	}]);
});