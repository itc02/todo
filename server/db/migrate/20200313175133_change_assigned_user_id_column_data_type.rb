class ChangeAssignedUserIdColumnDataType < ActiveRecord::Migration[6.0]
  def change
    change_column :todo_lists, :assigned_user_id, :integer
  end
end
