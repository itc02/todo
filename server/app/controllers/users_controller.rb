class UsersController < ApplicationController
    def get
        render :json => User.select("users.id, users.user_name").drop(1)
    end

    def add
        if !User.find_by(:user_name => params[:user_name])
            User.create(:user_name => params[:user_name])
            render :json => { isOkay: true }
        else
            render :json => { isOkay: false }
        end
    end

    def delete
        params[:IDs].each do |id|
            User.find(id).destroy
        end
        render :json => User.select("users.id, users.user_name").drop(1)
    end
end
