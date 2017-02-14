define(['app'],function (app) {
	app.directive('smallModal',function () {
		return {
			restrict:"E",
			transclude:true,
			templateUrl:"/html/common/small_modal.html",
			scope:{
				data:"=smallModalData",
				show:"@show"
			},
			link:function (scope,elment,attr,prent) {				
				if(scope.show=="false"){
					elment.find('.modal.fade').modal("hide")
				}else{
					elment.find('.modal.fade').modal("show")
				}
			}
		}
	})
})