/**
 * This view is an example list of people.
 */
Ext.define('Plani.view.main.Fixture', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainfixture'
    ,requires:[
      'Plani.store.Fixture'
      ,'Plani.store.Torneos'
    ]
    ,config: {
        tabBar: {
          style: 'background:#6c757d;'
          ,layout: {
                pack: Ext.filterPlatform('ie10') ? 'start' : 'center'
            }
        },
        activeTab: 1,
        defaults: {
            scrollable: true
            ,tab: {
              style:'color:#565656'
              ,padding:'0 5 0 5'
              ,margin: '0 10 0 0'
            }
        },
        items: [
            {
                iconCls: 'x-fa fa-home',
                xtype:'formpanel'
                ,itemId:'formFixturePlani'
                ,defaults: {
                    margin: '35 0'
                }
                ,items:[{
                  xtype:'selectfield'
                    ,label:'Torneo'
                    ,name:'torneo_id'
                    ,store:'Torneos'
                    ,displayField:'torneo_descri'
                    ,valueField:'torneo_id'
                    //,autoSelect: true
                     ,namecmb:'Categorias'
                    ,listeners:{
                      change: function(cmb,e){
                        Ext.getStore(cmb.namecmb).removeAll();
                        Ext.getStore(cmb.namecmb).load({params:{param:cmb.getValue()}});
                      }
                    }
                },{
                  xtype:'selectfield'
                  ,label:'Categoria'
                   ,store: 'Categorias'
                   ,displayField:'categoria_descri'
                   ,name:'categoria_id'
                   ,valueField:'categoria_id'
                   ,namecmb:'Zonas'
                   ,listeners:{
                     change: function(cmb,e){
                       Ext.getStore(cmb.namecmb).removeAll();
                       Ext.getStore(cmb.namecmb).load({params:{param:cmb.getValue()}});
                     }
                   }
                },{
                  xtype:'selectfield'
                  ,label:'Zona'
                  ,store: 'Zonas'
                  ,namecmb:'Fechas'
                  ,displayField:'zona_descri'
                  ,valueField:'zona_id'
                  ,name:'zona_id'
                  ,listeners:{
                    change: function(cmb,e){
                      Ext.getStore(cmb.namecmb).removeAll();
                      Ext.getStore(cmb.namecmb).load({params:{param:cmb.getValue()}});
                    }
                  }
                }
                // ,{
                //   xtype:'selectfield'
                //   ,label:'Fecha'
                //   ,store: 'Fechas'
                //   ,namecmb:'Fechas'
                //   ,displayField:'fecha_descri'
                //   ,valueField:'fecha_id'
                //   ,name:'fecha_id'
                //   ,listeners:{
                //     change: function(cmb,e){
                //       //Ext.getStore(cmb.namecmb).removeAll();
                //       //Ext.getStore(cmb.namecmb).load({params:{param:cmb.getValue()}});
                //     }
                //   }
                // }
                ,{
                  xtype: 'button',
                  text: 'Fixture',
                  style: 'background-color:#5fa2dd;height:50px;color:#FFF;font-size:20px',

                  handler: function (btn,e) {
                    console.log('este',btn.up().up('tabpanel'));
                    var val = Ext.ComponentQuery.query('#formFixturePlani')[0].getValues();
                    console.log('ver',val);
                    Ext.getStore('Fixture').load({params: val});
                    //Ext.ComponentQuery.query('#fixturePlani').getView().refresh();
                    btn.up().up('tabpanel').setActiveItem(2);
                  }
               }]
            },
            {
                iconCls: 'x-fa fa-list',
                layout:'fit',
                items:[{
                    xtype:'grid'
                    ,title: 'Fixture'
                    ,itemId:'fixturePlani'
                    ,emptyText: '<p style="color:red;font-size:15px;margin-top:110px;margin-left:10px;">No hay datos</p>'
                    ,store: 'Fixture'
                    ,columns: [
                       { text: 'Fecha ', dataIndex: 'fecha', width:60 ,sortable:false  },
                       { text: 'Equipo 1  ', dataIndex: 'equipo1', width: 100,sortable:false },
                       { text: 'VS',  value: 'VS',dataIndex: 'vs', width: 50,sortable:false },
                       { text: 'Equipo 2  ', dataIndex: 'equipo2', width: 100,sortable:false  },
                       { text: 'Cancha',dataIndex: 'cancha',width: 85,sortable:false },
                       {text: 'Turno  ',width: 100  ,dataIndex:'turno_descri',sortable:false }]
               }]


           }
       ]
   }

});
