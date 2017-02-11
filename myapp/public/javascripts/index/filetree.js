define(['app'],function (app) {
	app.service('filetree',function ($http) {
		this.getFile=function (scope) {
			$http.get('/files/tree').then(function (response) {
				scope.list=response.data;
				});
			
		}
	});
})