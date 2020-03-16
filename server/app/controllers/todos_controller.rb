class TodosController < ApplicationController
    def get
        render :json => get_all_todos
    end

    def get_by_id
        render :json => (
            TodoList
            .where(:id => params[:id])
            .joins(:user)
            .select("
                todo_lists.title, 
                todo_lists.description, 
                users.name, 
                todo_lists.deadline"
            )
            .as_json
        )
    end

    def add
        user = User.find_by(
            :name => params[:name]
        )
        TodoList.create(
            :title => params[:title], 
            :deadline => params[:deadline], 
            :description => params[:description], 
            :user_id => user.id
        )
        render :json => get_all_todos
    end

    def delete
        TodoList.find(
            params[:todoId]
        ).destroy
        render :json => get_all_todos
    end
    
    def update
        user = User.find_by(
            :name => params[:assigned_to]
        )
        TodoList.update(
            params[:id], 
            :title => params[:title], 
            :deadline => params[:deadline], 
            :description => params[:description], 
            :user_id => user.id
        )
        render :json => get_all_todos
    end

    def disable
        TodoList.update(
            params[:id], 
            :is_disabled => params[:is_disabled]
        )
        render :json => get_all_todos
    end

    def get_all_todos
        TodoList
        .joins(:user)
        .select("todo_lists.id, todo_lists.title, todo_lists.description, users.name, todo_lists.deadline, is_disabled")
        .as_json
    end
end
