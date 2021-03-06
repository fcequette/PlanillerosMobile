/**
 * This view is an example list of people.
 */
Ext.define('Plani.view.main.Sancionados', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainsancionados',
    requires:[
      'Plani.store.PartidosFecha',
      'Plani.store.Goleadores',
      'Plani.view.main.Fixture',
      'Plani.view.main.FormPlanilleros1',
      'Plani.store.Jugadores-Equipo',
      'Plani.store.Amonestados',
      'Plani.store.Sancionados',
      'Plani.view.main.MainVuelven',
      'Plani.view.main.MainCapilla',
      'Plani.view.main.MainSancionados',
      'Ext.form.Panel'
    ]
    ,store: [{
        type: 'goleadores'
    },{
       // type: 'amonestados'
    }]
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
        items: [{

			iconCls: 'x-fa fa-home',
                layout:'fit',
                items:[
                {/////////////////////////////////////////////////////////////////////////////////////////////////////////
                      xtype:'formpanel'
                      ,bodyPadding:20
                      ,itemId:'formVuelven'
                      ,url:'http://dario-casa.sytes.net/api/partidosfecha'
                      ,jsonSubmit:true
                      ,defaults:{
                        defaultPhonePickerConfig : {
                          doneButton : 'Aceptar',
                          cancelButton : 'Cancelar'
                        }
                        , margin: '30 0'
                      }
                      ,items:[{
                        xtype:'selectfield'
                          ,label:'Torneo'
                          ,name:'torneo_id'
                          ,store:'Torneos'
                          ,displayField:'torneo_descri'
                          ,valueField:'torneo_id'
                          ,namecmb:'Categorias'
                          ,listeners:{
                            change: 'onselectfieldChange'
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
                          change: 'onselectfieldChange'
                        }
                      },{
                         xtype:'button'
                        ,text:'Sancionados'
                        ,style: 'background-color:#21502a;height:50px;color:#FFF;font-size:20px'
                        ,handler: function(btn,e){
                          console.log('parametros',btn.up('#formVuelven').getValues());
                          Ext.getStore('Sancionados').load({params:btn.up('#formVuelven').getValues()});//TODO Pasar parametros
                          Ext.getStore('Vuelven').load({params:btn.up('#formVuelven').getValues()});
                          Ext.getStore('Capilla').load({params:btn.up('#formVuelven').getValues()});
                          btn.up().up('tabpanel').setActiveItem(1);
                        }
                     }]
                  }]

            },{

			iconCls: 'x-fa fa-list',
                 layout: 'fit',
                 items:[{
                    xtype:'tabpanel'
                    ,tabBar:{
                      //style:'background-color:#6c757d'
                       style:'background-color:#FFF'
                    }
                    ,defaults:{
                      tab: {
                        style:'color:gray;background-color:#FFF:border:2px;'
                        ,padding:'0 5 0 5'
                        ,margin: '0 10 0 0'
                      }
                    }
                    ,items:[{
                          title:'Sancionados',
                          xtype:'sancionados'

                      //     ,xtype:'grid'
                      //     //,title:'Sancionados'
                      //     ,store: 'Sancionados'
                      //     ,emptyText:'<p style="color:red;font-size:15px;margin-top:140px;margin-left:10px;">No hay expulsados cargados</p>'
                      //     //,height:200
                      //     ,fullscrean:true
                      //     ,titleBar: { hidden: true }
                      //     //,layout:'fit'
                      //
                      //     ,columns:[{
                      //       text: 'Id de jugador'
                      //       ,name: 'Id de jugador'
                      //       ,dataIndex : 'text'
                      //       ,width:300
                      //       ,hidden:true
                      //       ,sortable:false
                      //
                      //     },{
                      //       text: 'Jugador'
                      //       ,name: 'jugador_nombre'
                      //       ,dataIndex: 'jugador_nombre'
                      //       ,width:150
                      //       ,sortable:false
                      //
                      //     },{
                      //       text: 'Equipo'
                      //       ,name: 'equipo_nombre'
                      //       ,dataIndex: 'equipo_nombre'
                      //       ,width:150
                      //       ,sortable:false
                      //
                      //     },{
                      //       text: 'Vuelve'
                      //       ,name: 'sancionados_vuelve'
                      //       ,dataIndex: 'sancionados_vuelve'
                      //       ,width:80
                      //       ,sortable:false
                      //
                      //     },{
                      //       text: 'Sancion'
                      //       ,name: 'Nombre jugador'
                      //       ,dataIndex: 'sancion'
                      //       ,width:80
                      //       ,sortable:false
                      //
                      //     }]
                      // ,listeners:{
                      //   itemtap: function(grid, index, target, record, e) {
                      //          // if(e.target.classList.contains("fa-trash") || e.target.children[0] && e.target.children[0].classList.contains("fa-trash")){
                      //          //     Ext.Msg.confirm("Confirmar", "Desea realmente eliminarlo?", function(btn) {
                      //          //         if(btn == 'yes') {
                      //          //             grid.getStore().removeAt(index);
                      //          //         }
                      //          //     });
                      //          // }
                      //      }
                      // }

                    },{
                      title:'En capilla',
                      xtype:'maincapilla',
                      itemId: 'mc'
                    },{
                     title:'Vuelven',
                      xtype:'mainvuelven',
                      itemId: 'vs'
                    }]
                  }]
                  ,listeners:{
                    activate: function (panel,e){
                      // Ext.getStore('Goleadores').load({params:{fixture_id:record.data.fixture_id,fecha_id:record.data.fecha_id,equipo_id:record.data.equipo_id}});
                     }
                  }
           }]
      }
});
