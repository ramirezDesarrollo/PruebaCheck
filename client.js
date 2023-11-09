var GREY_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717';
var WHITE_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Fwhite-rocket-ship.png?1495811896182';


function asignarChecklistAutomatico(t, idCard) {
  // Obtén el correo por defecto
  var defaultEmail = "hernandezazael9901@gmail.com"; 
  // Crea un checklist y asígnalo al correo por defecto
  return t.card.createChecklist({
    title: 'Checklist por defecto',
    idCard: idCard,
  })
  .then(function(checklist) {
    // Asigna el correo por defecto a todos los items del checklist
    return t.checklist.addChecklistItem({
      idChecklist: checklist.id,
      name: 'Asignar a ' + defaultEmail,
      pos: 'top',
    });
  })
  .then(function() {
    return {
      // Indica que la operación fue exitosa
      message: 'Checklist creado y asignado automáticamente',
    };
  });
}


TrelloPowerUp.initialize({
    "card-buttons": function (t, options) {
      return [
        {
          icon: "https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421",
          text: "SISTEMAS",
          callback: function (t) {
            return t.popup({
              title: "Estimation",
              url: "estimate.html",
            });
          },
        },
      ];
    },
    //recuperamos nuestra estimacion usando t.get() 
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
    },
    
    'list-after-create': function(t, options) {
    // Asigna el checklist automáticamente cuando se crea una lista
      return asignarChecklistAutomatico(t, options.data.card.id);
    }

});




