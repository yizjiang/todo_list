class Todo < ActiveRecord::Base
  attr_accessible :complete, :name
  validates_presence_of :name, :message => "can't be blank"
  validates :name, length: { maximum: 256 }
end
