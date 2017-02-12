define(['app'],function (app) {
	app.filter('urlEncode',function () {
		return function (x) {
			x=x.replace(/\//g,"¿");
			return encodeURIComponent(x);
		}
	})
})