/**
 * This view is an example list of people.
 */
Ext.define('Plani.view.main.List', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainlist',

    requires: [
        'Plani.store.Posiciones'
    ],

    title: 'Posiciones'


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
        // header:{
        //   height:30
        // }
        items: [
            {
                iconCls: 'x-fa fa-home',
                xtype:'formpanel'
                ,defaults:{
                  defaultPhonePickerConfig : {
                    doneButton : 'Aceptar',
                    cancelButton : 'Cancelar'
                  }
                  , margin: '45 0'
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
                      //Ext.getStore(cmb.namecmb).removeAll();
                      //Ext.getStore(cmb.namecmb).load({params:{param:cmb.getValue()}});
                    }
                  }
                },{
                  xtype: 'button',
                  text: 'Posiciones',
                  style: 'background-color:#21502a;height:50px;color:#FFF;font-size:20px',
                  handler: function (btn,e) {
                    console.log('este',btn.up().up('tabpanel').down('formpanel').getValues());
                    Ext.getStore('Posiciones').load({params:btn.up().up('tabpanel').down('formpanel').getValues()});
                    btn.up().up('tabpanel').setActiveItem(2);
                  }
               }]
            },
            {
                iconCls: 'x-fa fa-edit',
                layout:'fit',
                items:[{
                    xtype:'grid'
                    //,itemId:'cardPlanillero2'
                    ,title: 'Posiciones'
                    ,emptyText: '<p style="color:red;font-size:15px;margin-top:110px;margin-left:10px;">No hay datos</p>'
                    //,features: [{type:'grouping'}]
                    //,store:'PartidosFecha'
                    ,store: 'Posiciones'
                    // ,plugins: [{
                    //     type: 'gridviewoptions'
                    // }]
                    ,columns: [
                      { text: '', dataIndex: 'pos', width:40,sortable: false},
                       { text: 'Id  ', dataIndex: 'equipo_id', width: 40 ,hidden:true},
                       { text: 'Equipo  ', dataIndex: 'equipo_nombre', width:200 ,sortable: false },
                       { text: 'Ptos',  dataIndex: 'ptos', width:70,sortable: false  },
                       { text: 'P.J', dataIndex: 'pj',width:80,sortable: false  },
                       { text: 'P.G', dataIndex: 'pg', width:80,sortable: false },
                       { text: 'P.E', dataIndex: 'pe', width: 80,sortable: false  },
                       { text: 'P.P', dataIndex: 'pp', width: 80 ,sortable: false },
                       { text: 'G.a.F', dataIndex: 'gf', width: 70 ,sortable: false},
                       { text: 'Dif ', dataIndex: 'dif', width: 70,sortable: false }
                    ],


                     //}
               }]


           }
       ]
   }

   });

/////////////////////////////////////////////////////////////////////////////////////////////////////
