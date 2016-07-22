'use strict';

var todoApp = angular.module('sailsToDoApp', ['ngRoute', 'ui.bootstrap']);

todoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/templates/todo.html',
      controller: 'TodoCtrl'
    }).otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }]);

todoApp.controller('TodoCtrl', ['$scope', '$rootScope','$log', 'TodoService', function($scope, $rootScope,$log, TodoService) {
  $scope.formData = {};
  $scope.todos = [];

  TodoService.getTodos().success(function(resp){
        $scope.todos = resp;
      }).error( function(err) {
        $log.log(err);
      });
 

  $scope.addTodo = function() {
    TodoService.addTodo($scope.formData).then(function(response) {
     // $scope.todos.push($scope.formData);
      $log.log($scope.formData);
      TodoService.getTodos().success(function(resp){
        $scope.todos = resp;
      }).error( function(err) {
        $log.log(err);
      });
      $scope.formData = {};
    });
  };

  $scope.compliteTodo = function(todo) {
    TodoService.compliteTodo(todo).then(function(response) {
         TodoService.getTodos().success(function(resp){
            $scope.todos = resp;
        }).error( function(err) {
            $log.log(err);
      });
    //  $scope.todos.splice($scope.todos.indexOf(todo), 1)
    });
  };

  $scope.removeTodo = function(todo) {
    TodoService.removeTodo(todo).then(function(response) {
      $scope.todos.splice($scope.todos.indexOf(todo), 1)
    });
  };
  
  $scope.isDone = function(item) {
    return item.done;
  };
  
  $scope.timeSpend = function(item){
      
      var updatedAt = new Date(item.updatedAt);
      var creatdAt = new Date( item.createdAt);
      var miliseconds = updatedAt - creatdAt;
      var seconds = miliseconds / 1000;
      var minutes = miliseconds / 60000;
      $log.log(`${minutes}min.${seconds}sec. for task: ` + item.value);
      return updatedAt - creatdAt;
  }
  
}]);