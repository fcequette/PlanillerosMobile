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
        'Plani.view.main.Fixture'

    ],


    controller: 'main',
    viewModel: 'main',

    defaults: {
        tab: {
            iconAlign: 'top'
            ,width:70
            ,style:'font-size:10px;'
            //background:gray;color:green
        },
        styleHtmlContent: true
    },

    tabBarPosition: 'bottom'


  ,items: [{
      title: 'Posiciones',
      iconCls: 'x-fa fa-list',
      layout: 'fit',
      items: [{
          xtype: 'mainlist'
      }]
  }, {
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
  }, {
      title: 'Sancionados',
      iconCls: 'x-fa fa-users',
      layout: 'fit',
     items: [{
         xtype: 'mainplanilleros'
     }]
  }]

,listeners:{
  initialize:function(bn,e){
    console.log('entra');
    if (!second){
      console.log('entro');
      //  Ext.Viewport.add({
      //         xtype: 'formpanel',
      //         title: 'LOGIN',
      //         //floating: true,
      //        // centered: true,
      //         width:'100%',
      //         height:'100%',
      //         modal: true,
      //         bodyPadding: 10,
      //         padding:'20 0 0 0',
      //         //style: 'background:green',
      //        // cls:'form-login',
      //         defaults:{
      //           margin:'50 0'
      //         }
      //         , items: [{
      //             xtype:'button'
      //             ,text: 'LOGIN'
      //             // ,style: 'background-color:#2d552d'
      //         },{
      //           label: 'Usuario',
      //           xtype: 'textfield'
      //         },{
      //           label: 'Clave',
      //           xtype: 'passwordfield'
      //         },{
      //            html:'<img width=254px; src="http://www.todalagringa.com.ar/wp-content/uploads/gfhfgh.png" alt="TODA LA GRINGA">'
      //            ,padding:'0 0 0 50'
      //            ,style: 'background-color:#2d552d',
      //         },{
      //           text: 'Ingresar',
      //           xtype: 'button',
      //           handler:function(fp,e) {
      //             Ext.Viewport.remove(fp.up('formpanel'),true);
      //             second = true;
      //             console.log('lalalala',second);
      //             //Ext.Viewport.add({ xtype: 'app-main'});
      //           }
      //      }]
      // });
    }
  }
}
//}]


});
