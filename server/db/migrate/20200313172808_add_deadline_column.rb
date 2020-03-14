class AddDeadlineColumn < ActiveRecord::Migration[6.0]
  def change
    add_column :todo_lists, :deadline, :datetime
  end
end
