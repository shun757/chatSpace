$(document).on('turbolinks:load', function() {
  url = $(location).attr('pathname');
  group_id = $('.group-info').data('group-id');

  function buildMessage(message) {
    var image = message.image ? `<img src="${message.image}">` : ``;
    var message = `<div class='message' data-message-id="${message.id}">
                    <div class='message__upper-info'>
                      <div class='message__upper-info__tolker'>
                        ${message.user_name}
                      </div>
                      <div class='message__upper-info__date'>
                        ${message.time}
                      </div>
                    </div>
                    <div class='message__text'>
                      <p class='lower-message__content'>
                        ${message.content}
                      </p>
                      ${image}
                    </div>
                  </div>`
    return message;
  }


// 非同期通信
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formdata = new FormData(this);
    $.ajax({
      url:         url,
      type:        "POST",
      data:        formdata,
      dataType:    'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildMessage(data);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $(".form__submit").prop("disabled", false);
    })

    .fail(function() {
      $(".form__submit").prop("disabled", false);
      alert('メッセージを入力してください');
    });
  });


  // 自動更新
  var interval = setInterval(function(){
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
      var messageId = $('.message:last').data('message-id') || 0;
      
      $.ajax({
        url:  "api/messages",
        type: 'GET',
        data: {
          id: messageId 
        },
        dataType: 'json'
      })
      .done(function(data) {
        if (data.length > 0){
          var addHtml ='';
          data.forEach(function(message){
            addHtml += buildMessage(message);
          });
          $('.messages').append(addHtml)
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
        }
      })
      .fail(function() {
        alert('自動更新に失敗しました')
      });
    } else {
      clearInterval(interval);
    }},5000);
});