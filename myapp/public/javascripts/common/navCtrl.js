define(['app'],function (app) {
	app.controller('navCtrl',['$scope',function (scope) {
		scope.navdata={
			brand:{
				url:"/#!/",
				val:"mill"
			},
			left:[{
				url:"/editor",
				val:"文件编辑"
			},{
				url:"http://www.163.com",
				val:"lina",
				active:true
			},{
				url:"http://www.126.com",
				val:"jack",
				dropdown:true,
				data:[{
					url:"http://www.qq.com",
					val:"ala"
				},{
				},{
					url:"http://www.baidu.com",
					val:"百度"
				}]
			},{
				url:"http://www.qq.com",
				val:"qq"
			}],
			form:{
				btn:"搜索",
				search:"你搜索的内容",
				doSearch:function () {
					// alert(scope.navdata.form.search);
					alert(this.search)
				}
			},
			right:[{
				url:"http://www.baidu.com",
				val:"刘剑"
			},{
				val:"刘德华",
				dropdown:true,
				data:[{
					url:"http://www.qq.com",
					val:"qq"
				},{

				},{
					url:"http://www.163.com",
					val:"网易"
				}]
			}]

			
		}
	}])
})