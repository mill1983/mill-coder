define(['app','angular'],function (app,angular) {
	app.directive('smallModal',function () {
		return {
			restrict:"E",
			transclude:true,
			templateUrl:"/html/common/small_modal.html",
			scope:{
				data:"=smallModalData",
				show:"=show"
			},
			/*controller:function  ($scope) {
				$scope.show=true;
				$scope.$watch($scope.show,function  (a,b) {
					debugger;
					console.log(a,b);
				});
			},
			link:function (scope,elment,attr,prent) {	

				
			}*/
		}
	});
	app.factory("SmallModalService",function  () {
		var service={};
		service.config=function  (conf) {
			service.id=conf.id;
		};
		service.show=function  () {
			var tat=angular.element(document.getElementById(this.id));
			tat.modal("show");
		};
		service.hide=function  () {
			var tat=angular.element(document.getElementById(this.id));
			tat.modal("hide");
		};
		return service;
	});
})