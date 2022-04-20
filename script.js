const url = 'https://apitestingapp1.herokuapp.com/messages/';
var username = "";
var old_messages = "";

$(document).keypress(function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        return false;
    }
});

function sendMessage() {
    console.log("sending message");
    $.ajax({
        url: url,
        contentType: "application/json",
        method: 'POST',
        dataType: 'json',
        data: `{ "author": "${$("#user_input").val()}", "text": "${$("#message_input").val()}" }`
    });
    $("#message_input").val('');
    console.log("message sent");
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

function getMessages() {
    $.ajax({
        url: url,
        contentType: "application/json",
        method: 'GET',
        success: function(data) {
          if (!_.isEqual(old_messages, data)) {
              old_messages = JSON.stringify(old_messages);
              for(e in data){
                  if(!old_messages.includes(JSON.stringify(data[e]))){
                      var message = $("<p></p>").text(`${JSON.stringify(data[e]['author'])}: ${JSON.stringify(data[e]['text'])}`);
                      $("#messages_div").append(message);
                  }
              }
            let objDiv = document.getElementById("messages_div");
objDiv.scrollTop = objDiv.scrollHeight;
            old_messages = data;
          }
        }
    });
}

function setUsername() {
    username = $("#user_input").val();
    console.log(username);
    $(".username-input").css("display", 'none');
    $("#messages_div").css("display", 'block');
    let objDiv = document.getElementById("messages_div");
objDiv.scrollTop = objDiv.scrollHeight;
            old_messages = data;
}

$(document).ready(function() {
    console.log("ready");
    getMessages();
    $("#messages_div").css("display", 'none');
    const message_interval = setInterval(function() {
        getMessages()
    }, 2000);
});