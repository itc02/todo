class UsersController < ApplicationController
    def index
        render :json => User.all
    end

    def add_user
        User.create :name => params[:name]
        render :json => {isOkay: true} 
    end
end
