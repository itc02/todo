# Table information

# status -> string

class Status < ApplicationRecord
  has_many :todo_lists
end
