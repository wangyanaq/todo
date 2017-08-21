/**
 * Created by Administrator on 2017/8/17.
 */
(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	angular
		.module('todoApp', ['todoApp.dataService','ngRoute'])
		.config(function($routeProvider){
			$routeProvider
				.when("/:status?",{
					templateUrl:'./view/todo.html',
					controller:'TodoController'
				})
		})
		.controller('TodoController',['$scope',"$location" ,"$routeParams","todoService", function ($scope,$location,$routeParams,todoService) {
			console.log($routeParams.status);
			var vm=$scope;
			// 1.展示数据：
			// name 表示任务名称
			// isCompleted 表示任务是否完成的状态
			// id 唯一标识


			//2.添加任务
			var todoList=todoService.getData();
			vm.todoList=todoList;
			vm.todoName="";
			vm.add=function(){
				if(vm.todoName.trim()===""){
					return;
				}
				todoService.add(vm.todoName);
				vm.todoName="";
			}

			//3.删除任务
			vm.del=todoService.del;

			//4.修改任务
			vm.editId=-1;
			vm.edit=function(id,isCompleted){
				if(!isCompleted){
					vm.editId=id;
				}
			};
			vm.update=function(id){
				vm.editId=-1;
			};

			//5.切换任务选中状态
			vm.checkAll=false;
			//5.1点击全选中，全不选中
			vm.changeAll=function(){
				todoService.changeAll(vm.checkAll);
			};
			//5.2全选中，上面按钮选中，一个不选中就不选中
			vm.changeOne=function(){
				todoService.changeOne(vm);
			};

			//6.清除已完成任务
			//6.1有已完成任务时，显示清除任务文字，没有不显示
			vm.isShow=todoService.isShow;
			//6.2清除任务文字（新建临时数组，存放未完成数据）
			vm.clearComplated=todoService.clearComplated;

			//7.显示未完成任务数
			vm.unCompletedCount=todoService.unCompletedCount;

			//8. 根据URL变化显示相应任务
			vm.state=undefined;
			var stateObj={
				active:false,
				completed:true
			}
			vm.state=stateObj[$routeParams.status];
			/*$scope.location=$location;
			$scope.$watch("location.url()",function(curVal,oldVal){
				/!*console.log(curVal);*!/
				switch (curVal){
					case "/":
						vm.state=undefined;
						break;
					case "/active":
						vm.state=false;
						break;
					case "/completed":
						vm.state=true;
						break;
				};
			});*/

		}]);

})(angular);
