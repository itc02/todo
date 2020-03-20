class A < ActiveRecord::Migration[6.0]
  def change
    change_column_null :todo_lists, :user_id, true
  end
end
