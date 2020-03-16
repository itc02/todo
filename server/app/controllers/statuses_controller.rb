class StatusesController < ApplicationController
  def get
    render :json => Status.all
  end
end
