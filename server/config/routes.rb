Rails.application.routes.draw do
  post 'addTodo', to: 'add_todos#add_todo'
end
