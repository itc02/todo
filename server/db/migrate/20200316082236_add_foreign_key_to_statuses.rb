class AddForeignKeyToStatuses < ActiveRecord::Migration[6.0]
  def change
    add_foreign_key :todo_lists, :statuses
  end
end
