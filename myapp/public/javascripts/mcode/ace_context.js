define(['app', 'context', 'ace'], function(app) {
	app.service('aceContext', function() {
		var editor = {};
		this.setEditor = function(ace) {
			editor = ace;
		}
		context.init({
			fadeSpeed: 100, //速度毫秒
			filter: function($obj) { //过滤器

			},
			above: true, //不要动,否则很多浏览器中没有显示
			preventDoubleContext: true, //打断默认右键菜单在context上
			compress: false //压缩
		});
		var setTheme = function(e) {
			e.preventDefault();
			editor.setTheme("ace/theme/" + e.currentTarget.innerHTML.trim());

		}
		var menusMenu = [];
		var modes = ["javascript", "java", "php", "xml", "json", "html", "css", "coffee"];
		modes.forEach(function(item, index, arr) {
			menusMenu.push({
				text: item,
				action: function(e) {
					e.preventDefault();
					editor.getSession().setMode("ace/mode/" + e.currentTarget.innerHTML.trim());
				}
			});
		});

		//选择器和菜单项
		context.attach('#editor', [{
			header: '设置'
		}, {
			text: '设置主题',
			subMenu: [{
				text: 'twilight',
				action: setTheme
			}, {
				text: 'monokai',
				action: setTheme
			}]

		}, {
			text: '设置语言',
			subMenu: menusMenu

		}, {
			divider: true
		}, {
			header: "操作"
		}, {
			text: '跳转到行',
			action: function(e) {
				e.preventDefault();
				var line = prompt("要跳转到的行:", "20");
				editor.gotoLine(line);
			}
		}, {
			text: '设为只读',
			onlyRead: false,
			action: function(e) {
				e.preventDefault();
				editor.setReadOnly(!editor.getReadOnly());
				e.currentTarget.innerHTML = e.currentTarget.innerHTML == "设为只读" ? "去除只读" : "设为只读";
			}
		}, {
			text: 'My Sub-menu',
			subMenu: [{
				text: 'My Link Title',
				href: 'http://contextjs.com/',
				target: '_blank'
			}, {
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
	})
});