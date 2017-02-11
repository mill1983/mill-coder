
requirejs.config({
	paths:{
		"acetools":"/ace/build/src/ext-language_tools",
        "angular":"/angular/angular",
        "angular-route":"/angular-route/angular-route",
        "ui-bootstrap":"/angular-bootstrap/ui-bootstrap",
        "nav":"/javascripts/common/nav",
        "navCtrl":"/javascripts/common/navCtrl",
        "angular-ui-tree":"/angular-ui-tree/dist/angular-ui-tree"
	},
	shim:{
		"acetools":{exports:"acetools"},
        "angular":{exports:"angular"},
        "angular-route":{
            exports:"angular-route",
            deps:["angular"]
        },
        "ui-bootstrap":{
            exports:"ui-bootstrap",
            deps:["angular"]
        },
        "angular-ui-tree":{
            exports:"angular-ui-tree",
            deps:["angular"]
        },
        "nav":{
            exports:"nav",
            deps:["app"]
        },
        "navCtrl":{
            exports:"navCtrl",
            deps:["app"]
        }
	}
});

require([
    "angular",
    "angular-ui-tree",
    "app",
    "indexCtrl",
    "EditorCtrl",
    "filetree",
    "navCtrl",
    "nav",
    "jumbotron",
    "tree",
    "route",

    ],function (angular) {
    
    angular.bootstrap(document,["myApp"]);
});