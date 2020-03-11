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
        TodoList.update(params[:id], :date => params[:date], :description => params[:description], :assigned_to => params[:assigned_to])
        render :json => TodoList.all
    end

    def disable
        TodoList.update(params[:id], :is_disabled => params[:is_disabled])
        render :json => TodoList.all
    end

    def update_todos
        TodoList.where(:assigned_to => params[:deletedUserName]).update_all(:assigned_to => 'Deleted')
        render :json => TodoList.all
    end
end
