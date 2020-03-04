class UsersController < ApplicationController
    def get_users
        render :json => User.all
    end

    def add_user
        if !User.find_by name: params[:name]
            User.create :name => params[:name]
            render :json => {isOkay: true} 
        else
            render :json => {isOkay: false}
        end
    end

    def delete_user
        User.find(params[:userId]).destroy
        render :json => User.all
    end
end
