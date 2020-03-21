class TodosController < ApplicationController
    def index
      TodoList
      .where(:user_id => nil)
      .update_all(:user_id => 1)
      
      render :json => get_all_todos
    end

    def create
      user = get_user_by_name
      TodoList.create(
        :title       => params[:title],
        :state_id    => 1,
        :deadline    => params[:deadline],
        :description => params[:description],
        :user_id     => user.id
      )

      render :json => get_all_todos
    end

    def destroy
        TodoList.find(params[:id]).destroy

        render :json => get_all_todos
    end

    def update
        user = get_user_by_name
        state = get_state_by_name

        TodoList.update(
          params[:id],
          :title       => params[:title],
          :deadline    => params[:deadline],
          :description => params[:description],
          :user_id     => user.id,
          :state_id    => state.id
        )
        render :json => get_all_todos
    end

    def delete_all
      TodoList.delete_all
      head :ok
    end

    def get_all_todos
        TodoList.joins(:state, :user)
        .select("
          todo_lists.id,
          todo_lists.title,
          todo_lists.description,
          users.user_name,
          states.state_name,
          todo_lists.deadline")
        .as_json
    end

    def get_user_by_name
      User.find_by(:user_name => params[:assigned_to])
    end

    def get_state_by_name
      State.find_by(:state_name => params[:state])
    end
end
