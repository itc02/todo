# Table information

# COLUMN NAME    TYPE        NULL        DEFAULT

# title       -> string   -> NOT NULL
# description -> string   -> NOT NULL 
# deadline    -> DateTime -> NULL
# user_id     -> integer  -> NOT NULL -> 0
# status_id   -> integer

class TodoList < ApplicationRecord
    belongs_to :state
    belongs_to :user
end