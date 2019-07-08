json.(@message, :content, :image)
json.user_name @message.user.name
json.time      @message.created_at.strftime("%Y/%m/%d %-H:%M")
json.id        @message.id
