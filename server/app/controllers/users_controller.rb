class UsersController < ApplicationController
    def get
        render :json => User.all.select("users.id, users.name")
    end

    def add
        if !User.find_by name: params[:name]
            User.create :name => params[:name]
            render :json => { isOkay: true }
        else
            render :json => { isOkay: false }
        end
    end

    def delete
        user = User.find(params[:userId]);
        User.find(params[:userId]).destroy
        render :json => {allUsersWithoutDeleted: User.all.order('name ASC'), deletedUserName: user[:name]}
    end
end
