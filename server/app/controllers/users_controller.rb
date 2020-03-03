class UsersController < ApplicationController
    def index
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
end
