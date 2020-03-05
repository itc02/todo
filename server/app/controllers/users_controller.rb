class UsersController < ApplicationController
    def get
        render :json => User.all.order('name ASC')
    end

    def add
        if !User.find_by name: params[:name]
            User.create :name => params[:name]
            render :json => {isOkay: true} 
        else
            render :json => {isOkay: false}
        end
    end

    def delete
        User.find(params[:userId]).destroy
        render :json => User.all.order('name ASC')
    end
end
