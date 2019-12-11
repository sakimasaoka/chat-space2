$(function(){
  var buildHTML = function(message){
    if (message.image)  {
      var html =`<div class="messege" data-message_id= "${message.id}">
      <div class="user-name">
      ${message.name}
      </div>
      <div class="time">
      ${message.created_at}
      </div>
      <div class="content">
      <p class="content">
      ${message.content}
      </p>
      <img src="${message.image}" class="content">
      </div>
      </div>`

    } else {
      var html =`<div class="message"  data-message_id="${message.id}">
      <div class="user-name">
      ${message.name}
      </div>
      <div class="time">
      ${message.created_at}
      </div>
      <div class="content">
      <p class="content">
      ${message.content}
      </p>
      </div>
      </div>`
    }
    return html
  }


  $('form').on('submit', function(e){
    e.preventDefault();
      var url = $(this).attr('action');
      var input = new FormData(this);
    if (window.location.href.match(/\/groups\/\d+\/messages/))
      
      $.ajax({
      url:  url,
      type: 'POST',
      data: input,
      dataType: 'json',
      processData: false,
      contentType: false
      })
      .done(function(newMessage){
        var html = buildHTML(newMessage);
        $('.main_chat__main').append(html);
        $('.new_message')[0].reset();
        $('.form__submit1').prop('disabled', false);
        $('.main_chat__main').animate({ scrollTop: $('.main_chat__main')[0].scrollHeight});
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      })
  })
    
    var reloadMessages = function() {
      
	
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.message:last').data('message_id');
    var href = 'api/messages'
      $.ajax({
		url: href,
		type: 'GET',
		data:{id: last_message_id},
		dataType: 'json'
		})
		
		.done(function(messages){
      messages.forEach(function(message){
      var insertHTML = buildHTML(message)
      $('.main_chat__main').append(insertHTML)
      });
      $('.main_chat__main').animate({scrollTop: $('.main_chat__main')[0].scrollHeight}, 'fast');
      })

		.fail(function(){
      alert('自動更新に失敗しました');
      });
  
    };
  }
      setInterval(reloadMessages, 5000);

  });