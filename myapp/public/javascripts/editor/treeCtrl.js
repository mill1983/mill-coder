define(['app'],function (app) {
	app.controller('treeCtrl',['$scope','$http','doPath','$routeParams',function (scope,http,location,params) {
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
		scope.buttonClick = function($event, node) {
			location.goPath(node,0);
			$event.stopPropagation();
	     };
	   
    	http.post('/editor/filetree?time='+(new Date()).getTime(),{url:params.root})
		.then(function (data) {
			scope.dataForTheTree=data.data;
			
		})
	  
		
		
	}]);
});