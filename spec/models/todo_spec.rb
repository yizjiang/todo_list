require "spec_helper"

describe Todo do
  before do
    @todo = Todo.new({name: '123', complete: false})
  end

  subject {@todo}

  it { should be_valid }

  it "should validate presence of each attribute" do
    todo = Todo.new
    todo.valid?
    presence_keys = []
    todo.errors.messages.each do |k, v|
      presence_keys << k if v.any? { |msg| msg.match("can't be blank") } end
    presence_keys.should == [:name]
  end

  it "should validate maximum length" do
    subject.name = 'a' * 257
    subject.save
    should_not be_valid
    subject.errors.messages[:name].first.match('is too long (maximum is 256 characters)')
  end

end
