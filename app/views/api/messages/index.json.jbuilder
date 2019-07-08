json.array! @new_message.each do |message|
  json.id message.id
  json.user_name  message.user.name
  json.time  message.created_at.strftime("%Y年%m月%d日 %H時%M分")
  json.content  message.content
  json.image  message.image
end