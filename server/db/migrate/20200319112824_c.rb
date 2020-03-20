class C < ActiveRecord::Migration[6.0]
  def change
    remove_column :todo_lists, :is_disabled
  end
end
