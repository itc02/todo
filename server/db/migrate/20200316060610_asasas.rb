class Asasas < ActiveRecord::Migration[6.0]
  def change
    add_column :todo_lists, :title, :string
    remove_column :todo_lists, :date
    add_column :todo_lists, :deadline, :datetime
    rename_column :todo_lists, :assigned_to, :user_id
    change_column :todo_lists, :user_id, :integer
    add_foreign_key :todo_lists, :users
  end
end
