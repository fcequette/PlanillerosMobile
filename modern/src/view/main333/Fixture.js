/**
 * This view is an example list of people.
 */
Ext.define('Plani.view.main.Fixture', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainfixture',
    store: [{
        type: 'fixture'
    },{
      type:'torneos'
    }]


    ,requires:[
      'Plani.store.Fixture'
      ,'Plani.store.Torneos'
    ]
    ,config: {
        tabBar: {
          padding:1
          ,style: 'background:#6c757d;'
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
                title: '.',
                xtype:'formpanel'
                ,defaults: {
                    margin: '25 0'
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
                },{
                  xtype:'selectfield'
                  ,label:'Fecha'
                  ,store: 'Fechas'
                  ,namecmb:'Fechas'
                  ,displayField:'fecha_descri'
                  ,valueField:'fecha_id'
                  ,name:'fecha_id'
                  ,listeners:{
                    change: function(cmb,e){
                      //Ext.getStore(cmb.namecmb).removeAll();
                      //Ext.getStore(cmb.namecmb).load({params:{param:cmb.getValue()}});
                    }
                  }
                }
                ,{
                  xtype: 'button',
                  text: 'Fixture',
                  style: 'background-color:#5fa2dd;height:50px;color:#FFF;font-size:20px',

                  handler: function (btn,e) {
                    console.log('este',btn.up().up('tabpanel'));
                    btn.up().up('tabpanel').setActiveItem(2);
                  }
               }]
            },
            {
                title: '.',
                layout:'fit',
                items:[{
                    xtype:'grid'
                    //,itemId:'cardPlanillero2'
                    ,title: 'Fixture'
                    ,features: [{type:'grouping'}]
                    //,store:'PartidosFecha'
                    ,store: 'Fixture'
                    ,columns: [
                      { text: 'Fecha ', dataIndex: 'fecha', width:60 },
                      { text: 'Equipo 1  ', dataIndex: 'equipo1', width: 100},
                       { text: 'VS',  value: 'VS',dataIndex: 'vs', width: 50 },
                       { text: 'Equipo 2  ', dataIndex: 'equipo2', width: 100 },
                       { text: 'Cancha',dataIndex: 'cancha',width: 85},
                       {text: 'Turno  ',width: 100  ,dataIndex:'turno_descri'}]

                     //}
               }]


           }
       ]
   }

});
