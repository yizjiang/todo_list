define([
  "views/todoPage"
], function (TodoPage) {

  var Todo = {

    init: function () {
      _.bindAll(this);
      // bootstrap data
      var bootstrapData = $("#parameter-management-config").data();
      var all_todos = bootstrapData.all_todos;
      console.log(JSON.stringify(all_todos));
      var todoPage = new TodoPage({
        todos: all_todos});
      $('#parameter_management')
        .append(todoPage.render().el);
    }

  };

  return Todo;

});
