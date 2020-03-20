Rails.application.routes.draw do
  get 'getTodos', to: 'todos#get'
  get 'getUsers', to: 'users#get'
  get 'getStates', to: 'states#get'
  get 'deleteAllTodos', to: 'todos#delete_all'
  post 'addTodo', to: 'todos#add'
  post 'addUser', to: 'users#add'
  post 'deleteTodo', to: 'todos#delete'
  post 'deleteUsers', to: 'users#delete'
  post 'updateTodo', to: 'todos#update'
end
