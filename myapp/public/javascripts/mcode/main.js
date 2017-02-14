requirejs.config({
	paths:{
        "ace":"/ace/build/src/ace",
        "ext-language":"/ace/build/src/ext-language_tools",
        "angular":"/angular/angular",
        "angular-route":"/angular-route/angular-route",
        "ui-bootstrap":"/angular-bootstrap/ui-bootstrap",
        "angular-tree":"/angular-tree-control/angular-tree-control",
        "context":"/context/index",
        "nav":"/javascripts/common/nav",
        "navCtrl":"/javascripts/common/navCtrl",
        "aceconf":"/javascripts/common/aceconf",
        "const":"/javascripts/common/const",
        "small_modal":"/javascripts/common/small_modal",
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
        "context":{
            exports:"context",
            deps:["css!/context.standalone/index.css"]
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
    "context",
    "app",
    "const",
    "rightClick",
    "context_config",
    "tree2arr",
    "ace_context",
    "treeCtrl",
    "indexCtrl",
    "navCtrl",
    "nav",
    "small_modal",
    "route",
    

    ],function (angular) {
    angular.bootstrap(document,["mcodeApp"]);
    
});