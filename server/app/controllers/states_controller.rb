class StatesController < ApplicationController
    def index
        render :json => State.all.select("states.state_name")
    end
end
