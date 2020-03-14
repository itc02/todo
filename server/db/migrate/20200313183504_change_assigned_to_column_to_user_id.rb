class ChangeAssignedToColumnToUserId < ActiveRecord::Migration[6.0]
  def change
    rename_column :todo_lists, :assigned_user_id, :user_id
  end
end
