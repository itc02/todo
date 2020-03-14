class AddTitleColumnToTodoLists < ActiveRecord::Migration[6.0]
  def change
    add_column :todo_lists, :title, :string

    TodoList.update_all(title: '-')
    
    change_column_null :todo_lists, :title, false
  end
end
