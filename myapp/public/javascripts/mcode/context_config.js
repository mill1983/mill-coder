define(['context','app'], function(c,app) {
	var funcs={};
	app.service('treeContext',function  () {
		context.init({
			fadeSpeed: 100,//速度毫秒
			filter: function($obj) {//过滤器

			},
			above: true,//不要动,否则很多浏览器中没有显示
			preventDoubleContext: true,//打断默认右键菜单在context上
			compress: false//压缩
		});
	
	context.attach('.ng-binding.ng-scope.branch', [
		{header:'模块管理'},
		{
			text: '创建模块',
			action: function(e,text) {
				e.preventDefault();
				funcs.createModel(text,0);
			}
		},{
			text: '添加条目',
			action: function(e,text) {
				e.preventDefault();
				funcs.createItem(text,1);
			}
		}
	]);
	context.attach('.ng-binding.ng-scope.leaf', [{
		header: '条目管理'
	}, {
		text: 'My Link Title',
		href: 'http://contextjs.com/',
		target: '_blank'
	},{
		text: '删除',
		action: function (e,text) {
			e.preventDefault();
			funcs.deleteItem(text);
		}
	}, {
		divider: true
	},  {
		text: 'My Sub-menu',
		subMenu: [{
			text: 'My Link Title',
			href: 'http://contextjs.com/',
			target: '_blank'
		},{
			text: '百度',
			href: 'http://www.baidu.com',
			target: '_blank'
		}]
	}, {
		text: 'context.js',
		href: 'http://contextjs.com/context.js',
		target: '_blank',
		action: function(e) {
			_gaq.push(['_trackEvent', 'ContextJS Download', this.pathname, this.innerHTML]);
		}
	}]);
		this.setContextFunc=function  (obj) {
			funcs=obj;
		}
	})
	
});