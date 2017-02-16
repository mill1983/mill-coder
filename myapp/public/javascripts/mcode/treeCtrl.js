define(['app'],function (app) {

	function refrent (http,scope,tree2arr) {
		http.get("/mcode/getmcodes").then(function (data) {
			var tree=tree2arr.arr2tree(data.data);
			scope.dataForTheTree=tree;

		});
	}
	function insert (McodeDbService,data,cb) {
		McodeDbService.insert(data)
		.then(cb,function (err) {
			console.log(err)
		});
	}
	function setCache (sessionKey,node) {
		sessionStorage.setItem(sessionKey.tplcatch,node.code||"");
		sessionStorage.setItem(sessionKey.mcodeConf,node.config||"");
	}
	app.controller('treeCtrl',['$scope','$http',
		'$routeParams','tree2arr','treeContext','McodeDbService',"SmallModalService","sessionKey"
		,function (scope,http,params,tree2arr,treeContext,McodeDbService,SmallModalService,sessionKey) {
		var currentNode={};//当前选中的枝节点
		var nowNode={};//当前编辑的节点
		SmallModalService.config({id:"myModal"});
		scope.treeOptions = {
		    nodeChildren: "child",
		    dirSelectable: true,
		    isLeaf:function  (node) {
		    	return node.is_leaves;
		    },
		    injectClasses: {
		        ul: "a1",
		        li: "a2",
		        liSelected: "a7",
		        iExpanded: "a3",
		        iCollapsed: "a4",
		        iLeaf: "a5",
		        label: "a6",
		        labelSelected: "a8"
		    }
		}
		//模态框初始化
		scope.modal={
	    	id:"myModal",
	    	title:"创建模块",
	    	show:false
	    }
		scope.form={
	    	name:"name",
	    	addModel:function  () {
	    		var data={
					"name": this.name,
					"parent_id": currentNode.id,
					"is_leaves": currentNode.type
				}
				SmallModalService.hide();
				insert(McodeDbService,data,function (data) {
					refrent(http,scope,tree2arr);
				});
				

	    	}
		}
		refrent(http,scope,tree2arr);
		
		scope.buttonClick = function($event, node) {
			$event.stopPropagation();
			if(node.is_leaves){//叶节点
				nowNode=node;
				scope.setEditorNode(node);
				setCache(sessionKey,node);
				
			}
	     };

	   //右键点击事件
	    scope.markme=function (e,node) {
	    	currentNode=node;
	    };
    	scope.dataForTheTree=[];
	  	//为右键菜单注册点击事件
		treeContext.setContextFunc({
			createModel:function (id,type) {//创建模块
				SmallModalService.show();
				currentNode.type=type;
				
			},
			createItem:function (id,type) {//创建条目
				SmallModalService.show();
				currentNode.type=type;
				
			},
			deleteItem:function () {
				var promise=McodeDbService.delete(currentNode.id);
				promise.then(function (data) {
					console.log(data);
				},function (err) {
					console.log(err);
				})
			}
		});
		
		
	}]);
});