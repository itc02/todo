class TodosController < ApplicationController
    def get_todos
        render :json => TodoList.all
    end
    
    def add_todo
        TodoList.create :date => params[:date], :description => params[:description], :assigned_to => params[:assignTo]
        render :json => { :isOkay => true}
    end

    def delete_todo
        TodoList.find(params[:todoId]).destroy
        render :json => TodoList.all
    end
end
