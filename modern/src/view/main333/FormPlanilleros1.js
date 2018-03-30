Ext.define('Plani.view.main.FormPlanilleros1', {
    //extend: 'Ext.container.Container',
     extend: 'Ext.form.Panel'
     ,requires: [
        // 'Torneo.view.panels.CardFixtureController',
     ]
     ,xtype:'formplanilleros1'
     ,jsonSubmit:true
     ,fullscreen: true
     ,initComponent: function(config) {
      		var me = this;
          Ext.apply(me, {
            url: me.url
            ,itemId:'frmPlanilleros-'+me.equipo_id
           ,items:[{
                xtype: 'textfield'
               ,name: 'fixture_id'
               ////,hidden:true
               ,value:me.fixture_id
            },{
               xtype: 'textfield'
              ,name: 'equipo_id'
              //,hidden:true
              ,value:  me.equipo_id
            },{
                 xtype: 'textfield'
                ,name: 'fecha_id'
                //,hidden:true
                ,value: me.fecha_id
            }]


        });
           me.callParent(config);
    }
  });
