$(document).on('turbolinks:load', function(){
  function buildUser(name, id, hidden) {
    if (hidden) {
      var btn = `<div class="chat-group-user__btn chat-group-user__btn--remove">削除</div>`
    } else {
      var btn = `<div class="chat-group-user__btn chat-group-user__btn--add">追加</div>`
    }
    var html = `<div class="chat-group-user clearfix" id=${id}>
                 <p class="chat-group-user__name">${name}</p>
                 ${btn}
                 ${hidden}
               </div>`
    return html;
  }
  


  $('#user-search-field').on('input', function(e) {
    var input = $("#user-search-field").val();
    var userIds = []
    $('.chat-group-users .chat-group-user').each(function(i,user) {
      userIds.push($(user).attr('id'))
    })
    $.ajax({
      type:     'GET',
      url:      '/users',
      data:     { keyword: input, user_ids: userIds },
      dataType: 'json'
    })
    .done(function(users) {
      $('#user-search-result').children().remove();
      if (users.length !== 0) {
        $.each(users, function(index, user) {
          var name = user.name;
          var id   = user.id;
          var html = buildUser(name, id, "");
          $('#user-search-result').append(html);
        })
      } else {
        html = `<div class="chat-group-user clearfix">
           <p class="chat-group-user__name">一致するユーザーが存在しません。</p>
         </div>`
        $('#user-search-result').append(html)
      }
    })
    .fail(function(){
      alert('error');
    });
  });


  $('#user-search-result').on('click', '.chat-group-user__btn--add', function() {
    $(this).parent().remove();
    var name = $(this).prev().text();
    var id = $(this).parent().attr('id');
    var hidden = `<input name="group[user_ids][]" type="hidden" id="${id}" value=${id}>`;
    var user = buildUser(name, id, hidden);
    $('.chat-group-users').append(user);
  });

  $('.chat-group-users').on('click', '.chat-group-user__btn--remove', function() {
    $(this).parent().remove();
    var name = $(this).prev().text();
    var id = $(this).parent().attr('id');
    var user = buildUser(name, id);
    $('#user-search-result').append(user);
  });
});