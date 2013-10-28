define ([
], function () {

  var TodoItem = Backbone.Model.extend({

    url: '/todos',

    url: function () {
      if (this.isNew()) {
        return "/todos";
      } else {
        return "/todos/" + this.id;
      }
    },

    parse: function (response, options) {
      console.log(JSON.stringify(response));
    }

  });

  return TodoItem;

});