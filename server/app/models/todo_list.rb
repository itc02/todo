# Table information

# COLUMN NAME    TYPE        NULL        DEFAULT

# title       -> string   -> NOT NULL
# description -> string   -> NOT NULL 
# deadline    -> DateTime -> NULL
# is_disabled -> boolaen  -> NULL
# user_id     -> integer  -> NOT NULL -> 0


class TodoList < ApplicationRecord
    belongs_to :user

    def user_name
        user.name
    end
end