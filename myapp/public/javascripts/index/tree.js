define(["app","filetree"],function (app,filetree) {
	app.directive("tree",function () {
		return{
			restrict:"AE",
			templateUrl:"/html/index/tree.html",
			replace:true,
			controller:function ($scope,filetree) {
				
				$scope.list=filetree.getFile($scope);
				// $scope.list=[
				// 	{title:"mill",url:"http://www.baidu.com"},
				// 	{
				// 		title:"qiuxin",
				// 		items:[
				// 			{title:"anan"},
				// 			{title:"tiantian"},
				// 		]
				// 	},
				// 	{title:"jone"},
				// 	{
				// 		title:"lina",
				// 		items:[
				// 			{title:"zhang"},
				// 			{title:"li"},
				// 		]
				// 	},
				// ]
					
				
			}
		}
	})
})