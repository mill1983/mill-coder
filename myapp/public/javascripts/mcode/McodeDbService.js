define(['app'],function (app) {
	app.service('McodeDbService',['$http',function (http) {
		var data={
			"id": 1,
			"name": "java",
			"parent_id": 0,
			"is_leaves": 0
		}
		this.insert=function (data) {
			return http.post('/mcode_db/add_code',{data:data});
		};

	}])
})