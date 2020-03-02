Rails.application.routes.draw do
  get 'getTodos', to: 'todos#index'
  post 'addTodo', to: 'todos#add_todo'
  get 'getUsers', to: 'users#index'
  post 'addUser', to: 'users#add_user'
end
