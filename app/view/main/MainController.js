/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Plani.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    onselectfieldChange:function(cmb,e){
      console.log('selectfieldchange');
      Ext.getStore(cmb.namecmb).removeAll();
      Ext.getStore(cmb.namecmb).load({params:{param:cmb.getValue()}});
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});
