class Api::MessagesController < ApplicationController

  def index
    @group = Group.find(params[:group_id])
    @message = Message.new
    @messages = @group.messages.includes(:user)
    respond_to do |format|
      format.html
      format.json { @new_message = @messages.where('id > ?', params[:id]) }
    end

  end

end