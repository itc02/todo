Rails.application.routes.draw do
  get 'getTodos', to: 'todos#get'
  get 'getUsers', to: 'users#get'
  get 'getStatuses', to: 'statuses#get'
  post 'addTodo', to: 'todos#add'
  post 'getUserById', to: 'todos#get_by_id'
  post 'addUser', to: 'users#add'
  post 'deleteTodo', to: 'todos#delete'
  post 'deleteUser', to: 'users#delete'
  post 'updateTodo', to: 'todos#update'
  post 'disableTodo', to: 'todos#disable'
end
