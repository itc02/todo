class DeleteDateColumn < ActiveRecord::Migration[6.0]
  def change
    remove_column :todo_lists, :date
  end
end
