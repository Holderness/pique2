class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    @users = User.all.sort_by &:last
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end


end
