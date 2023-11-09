var GREY_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717';
var WHITE_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Fwhite-rocket-ship.png?1495811896182';
var DEFAULT_USER_EMAIL = "azael.hernandez@ramirezvargasabogados.com";


function asignarChecklistAutomatico(t) {
  var cardId = t.getContext().card;
  // Crea un nuevo checklist
  return t.api(`/cards/${cardId}/checklists`, 'post', {
      name: 'Checklist por defecto',
  })
  .then(function(checklist) {
      // Añade un elemento al checklist
      return t.api(`/checklists/${checklist.id}/checkItems`, 'post', {
          name: 'Asignar a ' + DEFAULT_USER_EMAIL,
      });
  })
  .then(function() {
      // Cierra el popup después de completar las acciones
      return t.closePopup();
  })
  .then(function() {
      return {
          message: 'Checklist creado y asignado automáticamente',
      };
  })
  .catch(function(error) {
      console.error(error); // Registra cualquier error en la consola
      // Manejar el error según sea necesario
  });
}


TrelloPowerUp.initialize({
    "card-buttons": function (t, options) {
      return [
        {
          icon: "https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421",
          text: "SISTEMAS",
          callback: function (t) {        
            return asignarChecklistAutomatico(t);
            /*return t.popup({
              title: "Estimation",
              url: "estimate.html",
            });*/
          },
        },
      ];
    },
    //recuperamos nuestra estimacion usando t.get(), se muestra por fuera de la tarjeta
    'card-badges': function(t, options) {
      return t.get('card', 'shared', 'estimate')
      .then(function(estimate) {
        return [{
          icon: estimate ? GREY_ROCKET_ICON : WHITE_ROCKET_ICON,
          text: estimate || 'No Estimate!',
          color: estimate ? null : 'red',
        }];
      });
    },
    //Tal como lo hicimos con la credencial de la tarjeta, podemos obtener la estimación actual usando el t.get()método de la biblioteca del cliente Power-Up 
    //se muestra por dentro
    'card-detail-badges': function(t, options) {
      return t.get('card', 'shared', 'estimate')
      .then(function(estimate) {
        return [{
          title: 'Estimate',
          text: estimate || 'No Estimate!',
          color: estimate ? null : 'red',
          callback: function(t) {
            return t.popup({
              title: "Estimation",
              url: 'estimate.html',
            });
          }
        }]
      });
    }
});

