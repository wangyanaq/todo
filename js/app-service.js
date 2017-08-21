/**
 * Created by Administrator on 2017/8/17.
 */
(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	angular
		.module('todoApp', [])
		.service("todoService",function($window){

			var that = this;
			var localStorage=$window.localStorage;
			//将数据存放到localStorage中
			var todoList=JSON.parse(localStorage.getItem("todo"))||[];

			//将数据保存到localStorage中
			this.save=function(){
				localStorage.setItem("todo",JSON.stringify(todoList));
			}

			this.getData=function(){
				return todoList;
			}

			//2.添加数据
			this.add=function(todoName){
				//名字为空格，直接结束
				var id;
				id = todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1;
				todoList.push({id:id,name:todoName,isCompleted:false});
				this.save();
			};

			//3.删除数据
            this.del=function(id){
				for(var i=0;i<todoList.length;i++){
					if(todoList[i].id===id){
						todoList.splice(i,1);
						break;
					}
				}
				that.save();
		};

			//5.点击全选
			this.changeAll=function(checkAll){
				for (var i = 0; i < todoList.length; i++) {
					todoList[i].isCompleted=checkAll;
				}
				this.save();
			};
			this.changeOne=function(vm){
				//console.log(checkAll)
				for (var i = 0; i < todoList.length; i++) {
					//有一个没完成，就不选中
					if(todoList[i].isCompleted==false){
						vm.checkAll=false;
						this.save()
						return;
					}else{
						vm.checkAll=true;
					}

				}
			this.save();
		};

			//6.清除任务
			this.isShow=function(){
				for (var i = 0; i < todoList.length; i++) {
					if(todoList[i].isCompleted==true){
						that.save();
						return true;
						break;
					}
				}
				that.save();
				return false;
			};
			this.clearComplated=function(){
				var tempList=[];
				for (var i = 0; i < todoList.length; i++) {
					if(!todoList[i].isCompleted){
						//没被选中的存放到新数组中
						tempList.push(todoList[i]);
					}
				}
				//清空数组
				todoList.length=0;
				//重新赋值
				[].push.apply(todoList,tempList);
				that.save();
			};

			//7.显示未完成任务书
			this.unCompletedCount=function(){
				var count=0;
				for (var i = 0; i < todoList.length; i++) {
					if(!todoList[i].isCompleted){
						count++;
					}
				}
				return count;
			};

			//8. 根据URL变化显示相应任务


		})
		.controller('TodoController',['$scope',"$location" ,"todoService", function ($scope,$location,todoService) {
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
			$scope.location=$location;
			$scope.$watch("location.url()",function(curVal,oldVal){
				/*console.log(curVal);*/
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
			});

		}]);

})(angular);
