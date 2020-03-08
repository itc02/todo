class ChangeColumnsToNotNull < ActiveRecord::Migration[6.0]
  def change
    change_column_null(:todo_lists, :date, false)
    change_column_null(:todo_lists, :description, false)
    change_column_null(:todo_lists, :assigned_to, false)
    change_column_null(:users, :name, false)
  end
end
