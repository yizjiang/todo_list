define([
  "models/todoItem"
], function (TodoItem) {

  var Todos = Backbone.Collection.extend({
    model: TodoItem,

    initialize: function (options) {

    }

  });

  return Todos;
});
