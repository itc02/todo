class AddStatusField < ActiveRecord::Migration[6.0]
  def change
    add_column :todo_lists, :status_id, :integer
  end
end
