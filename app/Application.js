/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Plani.Application', {
    extend: 'Ext.app.Application',

    name: 'Plani',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    stores: [
      'PartidosFecha',
      'Fixture',
      'Torneos',
      'Categorias',
      'Zonas',
      'Fechas',
      'Jugadores-Equipo',
      'Goleadores',
      'Amonestados',
      'Expulsados',
      'Goleadores2',
      'Amonestados2',
      'Expulsados2',
      'Posiciones',
      'Sancionados',
      'Capilla',
      'Vuelven',
      'Jugadores'
        // TODO: add global / shared stores here
    ],

    launch: function () {
        // TODO - Launch the application
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
