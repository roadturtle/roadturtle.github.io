const url = 'https://apitestingapp1.herokuapp.com/messages/';
var username = "";

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

function getMessages() {
    /*$.ajax({
        url: url,
        contentType: "application/json",
        method: 'GET',
        success: function(data) {
            for (const e in data) {
                console.log("done")
            }
        }
    });*/
    console.log("got messages");
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
    }, 5000);
});
