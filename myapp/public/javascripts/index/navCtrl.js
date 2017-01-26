define(['app'],function (app) {
	app.controller('navCtrl',['$scope',function (scope) {
		scope.navdata={
			brand:{
				url:"http://www.baidu.com",
				val:"mill"
			},
			left:[{
				url:"http://www.qq.com",
				val:"jone"
			},{
				url:"http://www.163.com",
				val:"lina",
				active:true
			}]
		}
	}])
})