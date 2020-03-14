class AddDefaultValueToUserId < ActiveRecord::Migration[6.0]
  def change
    change_column_default  :todo_lists, :user_id, 0
  end
end
