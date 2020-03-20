class StatesController < ApplicationController
    def get
        render :json => State.all
    end
end
