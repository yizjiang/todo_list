define([
  "text!resources/templates/todoList.html",
  "views/todoItem"

], function (Template, TodoItem) {

  var TodoList = Backbone.View.extend({

    events: {
      'click #updateAll': "updateAll"
    },

    initialize: function (options) {
      _.bindAll(this);
      this.all_todos = options.todos;
    },

    render: function () {
      var body = _.template(Template);
      this.$el.html(body);

      for(var i = 0; i < this.all_todos.length; i++){
         var tokenItem = new TodoItem({
           todoItem:  this.all_todos.at(i),
           todos: this.all_todos
         });
        this.$el.find('#todoList').append(tokenItem.render().el);
      }
      return this;
    },

    updateAll: function () {
      var count = 0;
      this.all_todos.each(function (model){
        model.save(null, {
          async: false,
          success:function(model, response) {
            count = count + 1;
          },
          error: function(model, error) {
            console.log(model.toJSON());
            alert('update fail for ' + model.get('name'));
          }
        });
      });
      console.log(count);
      if(count == this.all_todos.length){
        alert('Successfully Update All');
      }

    }

  });

  return TodoList;

});
