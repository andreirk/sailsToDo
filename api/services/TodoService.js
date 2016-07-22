module.exports = {
  getTodos: function(next) {
    Todo.find().exec(function(err, todos) {
      if(err) throw err;
      next(todos);
    });
  },
  addTodo: function(todoVal, next) {
    Todo.create({value: todoVal}).exec(function(err, todo) {
      if(err) throw err;
      next(todo);
    });
  },

  compliteTodo: function(todoVal, next) {
    Todo.update({value: todoVal},{done: true}).exec(function(err, todo) {
      if(err) throw err;
      console.log('Updated user to have done ' + todo[0].done);
      next(todo);
    });
  }  
  
//   removeTodo: function(todoVal, next) {
//     Todo.destroy({value: todoVal}).exec(function(err, todo) {
//       if(err) throw err;
//       next(todo);
//     });
//   }
};