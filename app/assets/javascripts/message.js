$(function(){
  function buildHTML(message){
  
    // 「もしメッセージに画像が含まれていたら」という条件式
    console.log(message)
    if (message.image)  {
      var html =`<div class="messege">
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
    //メッセージに画像が含まれる場合のHTMLを作る

    } else {
      var html =`<div class="messege">
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
      
      //メッセージに画像が含まれない場合のHTMLを作る

    }
    
    
    return html
  }


  $('form').on('submit', function(e){
    e.preventDefault()
    var input = new FormData(this);
    //console.log(input)

    var url = $(this).attr('action')
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
      $('.main_chat__main').animate({ scrollTop: $('.main_chat__main')[0].scrollHeight});
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
})

