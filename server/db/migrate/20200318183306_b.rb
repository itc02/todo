class B < ActiveRecord::Migration[6.0]
  def change
    change_column :todo_lists, :user_id, :integer, :default => 0
  end
end
