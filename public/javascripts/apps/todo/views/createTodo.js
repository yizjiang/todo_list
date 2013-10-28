define([
  "models/todoItem",
  "text!resources/templates/createTodo.html"
], function (todoModel, Template) {

  var createTodo = Backbone.View.extend({

    events: {
      //"blur #todoName": "handleBlur",
      'click #saveButton': 'saveTodo'
    },

    initialize: function (options) {
      _.bindAll(this);
      this.todoItem = new todoModel({});
      this.todos = options.todos;
    },

    render: function () {
      var body = _.template(Template);

      this.$el.html(body);
      return this;
    },


    handleBlur: function (e) {
      this.todoItem.set({
        name: e.currentTarget.value
      });
    },

    saveTodo: function () {
      var that = this;
      var complete = this.$el.find("#complete").is(':checked');
      var name = this.$el.find("#todoName").val();
      this.todoItem.set({
        name: name,
        complete: complete
      });
      this.todoItem.save(null, {
        success:function(model, response) {
          //that.$el.find("#complete").attr(':checked', false);
          that.$el.find("#todoName").val("");
          that.todos.add(response);
        },
        error: function(model, error) {
          var errorString = '';
          for (var i = 0; i < error['responseJSON']['error'].length; i ++){
            errorString += error['responseJSON']['error'][i] + '\n';
          }
          alert(errorString)
        }
    });
    }

  });

  return createTodo;

});
