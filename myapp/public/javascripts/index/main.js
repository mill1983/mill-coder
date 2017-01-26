
requirejs.config({
	paths:{
		"acetools":"/ace/build/src/ext-language_tools",
        "angular":"/angular/angular",
        "angular-route":"/angular-route/angular-route",
        "ui-bootstrap":"/angular-bootstrap/ui-bootstrap"
	},
	shim:{
		"acetools":{exports:"acetools"},
        "angular":{exports:"angular"},
        "angular-route":{
            exports:"angular-route"
        }
	}
});

require([
    "angular",
    "app",
    "indexCtrl",
    "navCtrl",
    "nav",
    "jumbotron",
    "route",

    ],function (angular) {
    var editor=ace.edit("editor");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript")
    angular.bootstrap(document,["myApp"]);
});