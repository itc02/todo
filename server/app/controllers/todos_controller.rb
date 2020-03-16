class TodosController < ApplicationController
    def get
      render :json => get_all_todos
    end

    def get_by_id
        render :json => (
          TodoList
          .where(:id => params[:id])
          .joins(:user, :status)
          .select("
            todo_lists.title,
            todo_lists.description,
            statuses.status,
            users.name,
            todo_lists.deadline"
          )
          .as_json
        )
    end

    def add
        user = get_user_by_name
        status = get_status_by_name

        TodoList.create(
          :title => params[:title],
          :deadline => params[:deadline],
          :description => params[:description],
          :user_id => user.id,
          :status_id => status.id
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
        user = get_user_by_name
        status = get_status_by_name

        TodoList.update(
          params[:id],
          :title => params[:title],
          :deadline => params[:deadline],
          :description => params[:description],
          :user_id => user.id,
          :status_id => status.id
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
        .joins(:user, :status)
        .select("
          todo_lists.id,
          todo_lists.title,
          todo_lists.description,
          users.name,
          statuses.status,
          todo_lists.deadline,
          todo_lists.is_disabled")
        .as_json
    end

    def get_user_by_name
      User.find_by(
        :name => params[:assigned_to]
      )
    end

    def get_status_by_name
      Status.find_by(
        :status => params[:status_id]
      )
    end
end
