$(function () {
    //коннект к хабу
    var chat = $.connection.chatHub;

    //функции сервер -> клиент

    //добавление сообщений
    chat.client.addMessage = function (name, message, style) {
        // Добавление сообщений на веб-страницу 
        $('#chat').append('<p><b ' + style + '>' + htmlEncode(name)
            + '</b>' + htmlEncode(message) + '</p>');
        document.getElementById('chat').scrollTop = 9999;
    };
    //срабатывает при успешном подключении
    chat.client.onConnected = function (id, userName, allUsers) {
        chat.client.addMessage("    Nu zdarova, " + userName + ". Zahodi, prisazhivausya.");
        //расправляем список с уже имеющимися пользователями
        for (i = 0; i < allUsers.length; i++) {
            if (allUsers[i].ConnectionId != id)
                if (allUsers[i].Name != userName)
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
        // логин
        var name = document.getElementById('myNick').innerText;
        chat.server.connect(name);
        // отправка сообщения
        $('#press').click(function () {
            chat.server.send(document.getElementById('myNick').innerText, $('#enter').val());
            $('#enter').val('');
        });
    });
});
// локальные функции 
//Tags encoding
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}
// Добавление юзверя в список
function AddUser(id, name) {
    $("#list").append('<dt id="' + id + '">' + name + '</dt>');
}

document.onkeyup = function (e) {
    e = e || window.event;
    if ((e.keyCode === 13) && (document.getElementById("enter").readOnly === false)) {
        e.preventDefault();
        $('#press').click();
    }
};
