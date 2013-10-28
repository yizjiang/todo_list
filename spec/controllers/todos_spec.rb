require 'spec_helper'

describe TodosController do

  before do
    @todo = Todo.create({name: '123', complete: false})
  end

  describe "#index" do
    it "should be a ok" do
      get 'index'
      response.should be_success
      response.response_code.should == 200
    end

  end

  describe "#create" do
    it "should be ok" do
      xhr :post, :create, {:format => :json, :name => "name1", :complete => true}
      response.should be_success
      response.response_code.should == 200
    end
  end

  describe "#update" do
    it "should be ok" do
      xhr :put, :update, {:id => @todo.id, :name => "name1", :complete => true, :format => :json}
      response.should be_success
      response.response_code.should == 200
      @todo.reload
      @todo.name.should == 'name1'
    end
  end

end
