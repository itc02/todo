class CreateTodoLists < ActiveRecord::Migration[6.0]
  def change
    create_table :todo_lists do |t|
      t.string :date
      t.string :description
      t.string :assigned_to
      
      t.timestamps
    end
  end
end
