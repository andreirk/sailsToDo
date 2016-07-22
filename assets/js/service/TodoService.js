
todoApp.service('TodoService', function($http,$log, $q) {
  return {
    'getTodos': function() {
     
        return $http.get('/todo/getTodos');
    },
    'addTodo': function(todo) {
      var defer = $q.defer();
      $http.post('/todo/addTodo', todo).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'compliteTodo': function(todo) {
      var defer = $q.defer();
      $http.post('/todo/updateTodo', todo).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    } ,   
    'removeTodo': function(todo) {
      var defer = $q.defer();
      $http.post('/todo/removeTodo', todo).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
}});