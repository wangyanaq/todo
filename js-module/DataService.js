/**
 * Created by Administrator on 2017/8/19.
 */
(function(angular){
	'use strict';

	// Your starting point. Enjoy the ride!
	angular
		.module('todoApp.dataService', [])
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
})(angular);
