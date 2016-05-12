$(function () {
    //коннект к хабу
    var chat = $.connection.chatHub;

    //функции сервер -> клиент

    //добавление сообщений
    chat.client.addMessage = function (name, message) {
        // Добавление сообщений на веб-страницу 
        $('#text').append('<p><b>' + htmlEncode(name)
            + '</b>: ' + htmlEncode(message) + '</p>');
    };
    //срабатывает при успешном подключении
    chat.client.onConnected = function (id, userName, allUsers) {
        document.getElementById("name").readOnly = true;
        document.getElementById("message").readOnly = false;
        document.getElementById("connect").hidden = true;
        $('#hdId').val(id);
        $('#username').val(userName);
        chat.client.addMessage("Смотрящий", "Да какой ты, " + userName + "? Ты гребень!");
        //расправляем список с уже имеющимися пользователями
        for (i = 0; i < allUsers.length; i++) {
            AddUser(allUsers[i].ConnectionId, allUsers[i].Name);
        }
    }
    // вошел новый юзверь
    chat.client.onNewUserConnected = function (id, name) {
        AddUser(id, name);
    }
    //юзвер ливнул
    chat.client.onUserDisconnected = function (id, userName) {
        $('#' + id).remove();
    }
    // подключение. внутри уже выходит клиент -> сервер
    $.connection.hub.start().done(function () {
        // отправка сообщения
        $('#enter').click(function () {
            chat.server.send($('#name').val(), $('#message').val());
            $('#message').val('');
        });
        // логин
        $('#connect').click(function () {
            var name = $("#name").val();
            if (name.length > 0) {
                chat.server.connect(name);

            }
            else {
                alert("Имя ввёл!.. бля..")
            }
        });
    });
});

//Tags encoding
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}
// Добавление юзверя в список
function AddUser(id, name) {
    $("#userList").append('<dt id="' + id + '">' +name+ '</dt>');
}

document.onkeyup = function (e) {
    e = e || window.event;
    if ((e.keyCode === 13) && (document.getElementById("message").readOnly === false)) {
        $('#enter').click();
    }
};