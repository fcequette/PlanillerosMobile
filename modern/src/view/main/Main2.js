/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace the content of this view to suit the needs of your application.
 */
Ext.define('Plani.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',
    requires: [
        'Ext.MessageBox',
        'Plani.view.main.MainController',
        'Plani.view.main.MainModel',
        'Plani.view.main.List',
        'Plani.view.main.Planillero',
        'Plani.view.main.Fixture',
        'Plani.view.main.Sancionados'

    ],


    controller: 'main',
    viewModel: 'main',
    tabBar:{
      style:'background:#6c757d;'
    },

    defaults: {

        tab: {
            iconAlign: 'top'
            ,width:70
            ,style:'font-size:10px;background:#6c757d;color:#f0f0f0;'
            //background:gray;color:green
            //,style: 'background:green;'

        },
        styleHtmlContent: true
    },

    tabBarPosition: 'bottom'


  ,items: [{
      title: 'Planilleros',
      iconCls: 'x-fa fa-book',
       layout: 'fit',
      items: [{
          xtype: 'mainplanilleros'
      }]
  }, {
      title: 'Fixture',
      iconCls: 'x-fa fa-calendar',
      layout: 'fit',
     items: [{
         xtype: 'mainfixture'
     }]
  },{
      title: 'Posiciones',
      iconCls: 'x-fa fa-list',
      layout: 'fit',
      items: [{
          xtype: 'mainlist'
      }]
  },{
      title: 'Sancionados',
      iconCls: 'x-fa fa-users',
      layout: 'fit',
     items: [{
         xtype: 'mainsancionados'
     }]
  }]

,listeners:{
  initialize:function(bn,e){
    if (!second){
      console.log('entro');
       Ext.Viewport.add({
              xtype: 'formpanel',
              itemId:'formLog',
              width:'100%',
              height:'100%',
              bodyPadding: 10,
              style: 'background-color:#5fa2dd',
              defaults:{
                margin:'50 0'
              }
              , items: [
              {
                html:'<div><img width=120px;height:100px; src="http://dario-casa.sytes.net/logo.jpeg" alt="TODA LA GRINGA"><div style=padding-left:30px;color:#FFF;font-size:50px;display:inline-block></div></div>'
                ,padding:'0 0 0 0'
                ,margin:0
                ,style: 'background-color:#5fa2dd'
                ,height:120
              },{
                label: 'Usuario',
                xtype: 'textfield',
                name:'username'
              },{
                label: 'Clave',
                xtype: 'passwordfield',
                name:'password',

              },{
                 xtype: 'hiddenfield'
                ,name: 'grant_type'
                ,value: 'password'
              },{
                 xtype: 'hiddenfield'
                ,name: 'client_id'
                ,value: 'testclient'
              },{
                 xtype: 'hiddenfield'
                ,name: 'client_secret'
                ,value: 'frutill4s'
              },{
                  text: 'INGRESAR1',
                  xtype: 'button',
                  style: 'background-color:#5fa2dd;height:50px;color:#FFF;font-size:20px',
                  handler:function(fp,e) {
                    var form = Ext.ComponentQuery.query('#formLog')[0];
                    jsonData = form.getValues();
                    jsonData.username = jsonData.username.toLowerCase();
                    var myJson = jsonData;
                     Ext.Ajax.request({
                        url: 'http://dario-casa.sytes.net/api/oauth'
                       ,method: 'POST'
                       ,headers: {
                         'Content-Type' : 'application/json'
                       }
                       ,jsonData: myJson
                       ,callback: function( opt, success, response ) {
                         var json = Ext.decode(response.responseText);
                         if ( json.status == 401 ) {
                           Ext.Msg.alert('ERROR', 'Combinación de usuario y clave inválido', function() {
                             //me.view.down('#loginCard textfield[inputType="password"]').focus(true, 100);
                           });
                           return false;
                         }
                         if ( response.status == 200 ) {
                           //guardo acces token y refresh token
                           localStorage.setItem('EPW-AccessToken', json.access_token);
                           localStorage.setItem('EPW-RefreshTOKEN', json.refresh_token);
                           localStorage.setItem('EPW-ExpireOAUTH', json.expires_in);
                           var today= new Date();//fecha actual
                           var expiration = json.expires_in-600; // tomo el token y le resto lo que deseo restar de tiempo
                           var dateExpiration = Ext.Date.add( today, Ext.Date.SECOND, expiration);//fecha actual mas expiracion
                           localStorage.setItem('EPW-DateExpiration',dateExpiration); // guardo en localStorage
                           // busco los datos del usuario
                           //Cierro la ventana de login
                           Ext.Viewport.remove(fp.up('formpanel'),true);
                           second = true;
                           console.log('second',second);

                         } else {
                           Ext.Msg.alert('ERROR', 'Usuario o Contraseña incorrectos', function() {
                             //me.view.down('#loginCard textfield[inputType="password"]').focus(true, 100);
                           });
                         }
                       }
                       ,failure: function( form, action ) {
                         Ext.Msg.alert('ERROR', 'Problemas de conexión', function() {
                         });
                       }
                     });
                  }
             }]
      });
    }
  }
}
//}]


});
