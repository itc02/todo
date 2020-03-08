class TodosController < ApplicationController
    def get
        render :json => TodoList.all
    end
    
    def add
        TodoList.create :date => params[:date], :description => params[:description], :assigned_to => params[:assignTo]
        render :json => {isOkay: true}
    end

    def delete
        TodoList.find(params[:todoId]).destroy
        render :json => TodoList.all
    end

    def update
        puts params[:assigned_to]
        TodoList.update(params[:id], :date => params[:date], :description => params[:description], :assigned_to => params[:assigned_to])
        render :json => TodoList.all
    end

    def disable
        TodoList.update(params[:id], :is_disabled => params[:is_disabled])
        render :json => TodoList.all
    end

    def update_todos
        availableUsers = params[:users]
        puts 'aaaaaaaaaaaaaaaaaaaa',availableUsers
        TodoList.all.each do |todo|
            if(!availableUsers.include?(todo.assigned_to))
                TodoList.update(todo.id, :assigned_to => 'Deleted') 
            end
        end
        render :json => TodoList.all
    end
end
