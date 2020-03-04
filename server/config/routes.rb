Rails.application.routes.draw do
  get 'getTodos', to: 'todos#get_todos'
  post 'addTodo', to: 'todos#add_todo'
  get 'getUsers', to: 'users#get_users'
  post 'addUser', to: 'users#add_user'
  post 'deleteTodo', to: 'todos#delete_todo'
  post 'deleteUser', to: 'users#delete_user'
end
