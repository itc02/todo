class AddIsDisabledToTodoList < ActiveRecord::Migration[6.0]
  def change
    add_column :todo_lists, :is_disabled, :boolean
  end
end
