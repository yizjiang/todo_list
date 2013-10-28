define([
  "views/createTodo",
  "views/todoList",
  "collections/todos",
  "text!resources/templates/todoPage.html"
], function (CreateTodo, TodoList, Todos, Template) {

  var TodoPage = Backbone.View.extend({

//    events: {
//    },

    initialize: function (options) {
      _.bindAll(this);
      this.all_todos = new Todos(options.todos);
      this.all_todos.bind('add', this.resetList);
      this.all_todos.bind('remove', this.resetList);
      $(document).click(function(e) {
        $('.todoName').each(function() {$(this).removeClass('hide')});
        $('.updateTodoName').each(function() {$(this).addClass('hide')});
      });
    },

    render: function () {
      var body = _.template(Template);
      this.$el.html(body);

      this.createTodo = new CreateTodo({
        todos: this.all_todos});

      this.todoList = new TodoList({
        todos: this.all_todos});

      this.$el.find('#addNewTask').html(this.createTodo.render().el);
      this.$el.find('#toDoList').html(this.todoList.render().el);
      return this;
    },

    resetList: function () {
      console.log(this.all_todos.length);
      this.$el.find('#toDoList').empty();
      this.$el.find('#toDoList').html(this.todoList.render().el);
    }

  });

  return TodoPage;

});
