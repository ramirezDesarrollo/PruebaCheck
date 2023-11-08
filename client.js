document.addEventListener('DOMContentLoaded', function () {
    var checkConnectionButton = document.getElementById('checkConnectionButton');
    var connectionStatus = document.getElementById('connectionStatus');
  
    checkConnectionButton.addEventListener('click', function () {
      // Verificar si estás autorizado
      Trello.authorize({
        interactive: true, // Cambiado a true para permitir interacción
        type: 'popup', // O 'redirect' según tu preferencia
        success: function () {
          // Estás autorizado, mostrar un mensaje de conexión exitosa
          connectionStatus.textContent = "Conexión exitosa a Trello";
        },
        error: function () {
          // No estás autorizado, mostrar un mensaje de error
          connectionStatus.textContent = "No estás conectado a Trello";
        }
      });
    });
});
