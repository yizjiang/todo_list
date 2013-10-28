class TodosController < ApplicationController
  def new
    @todo = Todo.new
  end

  def create
    todo = Todo.new({name: params[:name], complete: params[:complete] | false})
    if todo.save
      render :json => todo, :status => :ok
    else
      render :json => {:error => todo.errors.full_messages}, :status => :unprocessable_entity
    end
  rescue => e
  render :json => {:error => "Could not create todo."}, :status => :unprocessable_entity
  end

  def show

  end

  def update
    todo = Todo.find(params[:id])
    todo.update_attributes(params.slice(:name, :complete))
    render :json => todo, :status => :ok
  rescue => e
    render :json => {:error => "Could not create todo."}, :status => :unprocessable_entity
  end

  def destroy
    todo = Todo.destroy(params[:id])
    render :json => todo, :status => :ok
  rescue => e
    render :json => {:error => "Could not create todo."}, :status => :unprocessable_entity
  end

  def index
    @todo_list = Todo.all
  end
end
