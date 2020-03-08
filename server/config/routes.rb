Rails.application.routes.draw do
  get 'getTodos', to: 'todos#get'
  post 'addTodo', to: 'todos#add'
  get 'getUsers', to: 'users#get'
  post 'addUser', to: 'users#add'
  post 'deleteTodo', to: 'todos#delete'
  post 'deleteUser', to: 'users#delete'
  post 'updateTodo', to: 'todos#update'
  post 'disableTodo', to: 'todos#disable'
  post 'updateTodos', to: 'todos#update_todos'
end
