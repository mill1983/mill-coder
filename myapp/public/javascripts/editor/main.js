requirejs.config({
	paths:{
        "ace":"/ace/build/src/ace",
        "ext-language":"/ace/build/src/ext-language_tools",
        "angular":"/angular/angular",
        "angular-route":"/angular-route/angular-route",
        "ui-bootstrap":"/angular-bootstrap/ui-bootstrap",
        "angular-tree":"/angular-tree-control/angular-tree-control",
        "nav":"/javascripts/common/nav",
        "navCtrl":"/javascripts/common/navCtrl",
        "urlEncode":"/javascripts/common/urlEncode",
        "aceconf":"/javascripts/common/aceconf",
	},
	shim:{
		"acetools":{exports:"acetools"},
        "angular":{exports:"angular"},
        "angular-tree":{
            exports:"angular-tree",
            deps:[
                "angular",
                "css!/angular-tree-control/css/tree-control-attribute.css",
                "css!/angular-tree-control/css/tree-control.css",

            ]
        },
        "angular-route":{
            exports:"angular-route",
            deps:["angular"]
        },
        "ui-bootstrap":{
            exports:"ui-bootstrap",
            deps:["angular"]
        },
        
        "nav":{
            exports:"nav",
            deps:["app"]
        },
        "navCtrl":{
            exports:"navCtrl",
            deps:["app"]
        },
        ace:{
            exports:"ace"
        },
        "ext-language":{
            exports:"ext-language"
        }
	},
    map: {
        '*': {
            'css': '/require-css/css.js'
        }
    }
});
require([
    "angular",
    "angular-route",
    "ace",
    "ext-language",
    "app",
    "doPath",
    "urlEncode",
    "treeCtrl",
    "formCtrl",
    "indexCtrl",
    "EditorCtrl",
    "navCtrl",
    "nav",
    "route",

    ],function (angular) {
    
    angular.bootstrap(document,["editorApp"]);
    
});