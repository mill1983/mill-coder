define(['app'],function (app) {
	app.directive('ngRightClick', function($parse) {
	    return {
	    	link:function(scope, element, attrs) {
		        var fn = $parse(attrs.ngRightClick);
		        element.bind('contextmenu', function(event) {
		            scope.$apply(function() {
		                event.preventDefault();
		                //parse解析后的函数接收两个参数(上下文,变量对象)
		                //如果指令中的函数调用fun($event),则可以拿到event
		                //ng-right-click="test()",则必须有scope.test=function(){...}
		                fn(scope, {$event:event});
		            });
		        });  
	    	},
	    } 
	});  
})