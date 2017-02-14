define(['app'],function (app) {
	app.controller('treeCtrl',['$scope','$http','$routeParams','tree2arr'
		,function (scope,http,params,tree2arr) {
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
		http.get("/mcode/getmcodes").then(function (data) {
			var tree=tree2arr.arr2tree(data.data);
			scope.dataForTheTree=tree;

		});
		scope.buttonClick = function($event, node) {
			// location.goPath(node,0);
			$event.stopPropagation();
	     };
	   
    	scope.dataForTheTree=[];
	  
		
		
	}]);
});