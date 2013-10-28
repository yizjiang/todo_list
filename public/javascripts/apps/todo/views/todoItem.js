define([
  "text!resources/templates/todoItem.html"

], function (Template) {

  var TodoItem = Backbone.View.extend({

    events: {
      'click #deleteButton': 'deleteTodo',
      'click #updateButton': 'updateTodo',
      'click #todoName': 'showUpdate',
      "click #updateTodoName": 'updateState',
      "blur #updateTodoName": "handleBlur"
    },

    initialize: function (options) {
      _.bindAll(this);
      this.todoItem = options.todoItem;
      this.todos = options.todos;
    },

    render: function () {
      var body = _.template(Template, {
        model: this.todoItem.toJSON()
      });
      this.$el.html(body);
      this.$el.find('#complete').prop( "checked", this.todoItem.get('complete'));
      var that = this;
      this.$el.find('#complete').change(function() {
        that.todoItem.set({complete: this.checked});
      });
      return this;
    },

    deleteTodo: function () {
      var that = this;
      console.log(JSON.stringify(this.todoItem));
      this.todoItem.destroy({
        success:function(model, response) {
          that.todos.remove(model);
        },
        error: function(model, error) {
          console.log(model.toJSON());
          console.log('error.responseText');
        }
      });
    },

    showUpdate: function (event) {
      event.stopPropagation();
      event.preventDefault();
      this.$el.find('#todoName').addClass('hide');
      this.$el.find('#updateTodoName').removeClass('hide');
    },

    updateTodo: function () {
      var that = this;
      var name = this.$el.find('#updateTodoName').val();
      var complete = this.$el.find("#complete").is(':checked');
      this.todoItem.save({name: name, complete: complete}, {
        success:function(model, response) {
          alert('update success');
          that.todos.add(response);
        },
        error: function(model, error) {
          console.log(model.toJSON());
          console.log('error.responseText');
        }
      });
    },
    updateState: function (e) {
      e.stopPropagation();
      e.preventDefault();
    },

    handleBlur: function (e) {
      e.stopPropagation();
      e.preventDefault();
      this.todoItem.set({name: e.currentTarget.value});
      this.$el.find('#todoName').text(e.currentTarget.value);
    }

  });

  return TodoItem;

});
