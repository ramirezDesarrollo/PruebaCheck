document.addEventListener('DOMContentLoaded', function () {
    var checkConnectionButton = document.getElementById('checkConnectionButton');
    var connectionStatus = document.getElementById('connectionStatus');

    checkConnectionButton.addEventListener('click', function () {
        Trello.authorize({
            interactive: true,
            type: 'popup',
            success: function () {
                connectionStatus.textContent = "Conexión exitosa a Trello";
            },
            error: function () {
                connectionStatus.textContent = "No estás conectado a Trello";
            }
        });
    });
});




