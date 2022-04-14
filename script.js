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
              for(e in data){
                  console.log(data[e]);
              }
            old_messages = data;
          }
          else {
            console.log('same');
          }
        }
    });
}

function setUsername() {
    username = $("#user_input").val();
    console.log(username);
    $(".username-input").css("display", 'none');
}

$(document).ready(function() {
    console.log("ready");
    getMessages();
    const message_interval = setInterval(function() {
        getMessages()
    }, 2000);
});