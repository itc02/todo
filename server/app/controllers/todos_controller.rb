class TodosController < ApplicationController
    def index
        render :json => TodoList.all
    end
    
    def add_todo
        TodoList.create :date => params[:date], :description => params[:description], :assigned_to => params[:assignTo]
        render :json => { :isOkay => true}
    end
end
