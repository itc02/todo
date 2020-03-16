# Table information

# COLUMN NAME    TYPE        NULL        DEFAULT

# title       -> string   -> NOT NULL
# description -> string   -> NOT NULL 
# deadline    -> DateTime -> NULL
# is_disabled -> boolaen  -> NULL
# user_id     -> integer  -> NOT NULL -> 0
# status_id   -> integer

class TodoList < ApplicationRecord
    belongs_to :user
    belongs_to :status

    def user_name
        user.name
    end
end