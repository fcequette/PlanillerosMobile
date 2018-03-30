/**
 * This view is an example list of people.
 */
Ext.define('Plani.view.main.Planillero', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainplanilleros',
    requires:[
      'Plani.store.PartidosFecha',
      'Plani.store.Goleadores',
      'Plani.view.main.Fixture',
      'Plani.view.main.FormPlanilleros1',
      'Plani.store.Jugadores-Equipo',
      'Plani.store.Amonestados',
      'Plani.store.Expulsados',
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
                title: '<a style=color:#5fa2dd>.</a>',
                layout:'fit',
                items:[
                {/////////////////////////////////////////////////////////////////////////////////////////////////////////
                      xtype:'formpanel'
                      ,bodyPadding:20
                      ,itemId:'cardPlanillero1'
                      ,url:'http://dario-casa.sytes.net/api/partidosfecha'
                      ,jsonSubmit:true
                      ,defaults:{
                            margin: '30 0'
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
                        xtype:'selectfield'
                        ,label:'Zona'
                        ,store: 'Zonas'
                        ,namecmb:'Fechas'
                        ,displayField:'zona_descri'
                        ,valueField:'zona_id'
                        ,name:'zona_id'
                        ,listeners:{
                          change: 'onselectfieldChange'
                        }
                      },{
                        xtype: 'selectfield'
                        ,label: 'Fecha'
                        ,displayField:'fecha_descri'
                        ,valueField:'fecha_id'
                        ,name:'fecha_id'
                        ,itemId:'fecha_id_plani'
                        ,store: 'Fechas'
                        ,listeners:{
                          change:function(c,e){
                            if(c.getValue()!= null){
                              c.up().down('#btnPlanillero').show();
                            }
                          }
                        }
                      },{
                        xtype:'button'
                        ,text:'Planilleros'
                        ,itemId:'btnPlanillero'
                        ,hidden:true
                        ,style: 'background-color:#5fa2dd;height:50px;color:#FFF;font-size:20px'
                        ,handler: function(btn,e){

                            btn.up().up('tabpanel').setActiveItem(1);
                            console.log('values',btn.up('formpanel').getValues());
                            Ext.getStore('PartidosFecha').removeAll();
                             //btn.up().up().up().down('#gridPartidoFecha').mask('Cargando...');
                             Ext.getStore('PartidosFecha').reload({params:btn.up('formpanel').getValues(),callback:function(a,b,c){
                               console.log('lalalyyyylalala',a.length);
                               if(a.length==0){
                                 Ext.Msg.show({
                                   title:'ATENCIÓN'
                                   ,message: 'No  hay partidos para la  fecha'
                                   ,buttons: Ext.Msg.OK
                                 });
                                 btn.up().up('tabpanel').setActiveItem(0);
                               }
                             }});
                              btn.up().up().up().down('#gridPartidoFecha').setTitle('Fecha '+btn.up('formpanel').getValues().fecha_id)
                            //console.log('este esgrid',btn.up().up().up().down('#gridPartidoFecha'));
                             //btn.up().up().up().down('#gridPartidoFecha').setTitle('Fecha '+btn.up('formpanel').getValues().fecha_id)
                        }
                     }]
                  }]

            },
            {
              title: '<a style=color:#5fa2dd>.</a>',
                layout: 'fit',
                items:[{
                     xtype:'grid'
                    ,title: 'Fecha'
                    ,itemId:'gridPartidoFecha'
                    ,store: 'PartidosFecha'
                    //,emptyText:'No no  hay partidos en la fecha'
                    ,columns: [
                     { text: 'Equipo 1  ', dataIndex: 'equipo1', width:150,sortable:false},
                     { text: 'VS',  value: 'VS', dataIndex: 'vs',width: 70,sortable:false },
                     { text: 'Equipo 2  ', dataIndex: 'equipo2',  width:150,sortable:false }]
                     ,listeners:{
                       select: function(gr,record,e){
                         var e1 = record.data.equipo1;
                         var e2 = record.data.equipo2;
                         var id_e1 = record.data.equipo1_id;
                          var id_e2 = record.data.equipo2_id;
                         var fecha = record.data.fecha_id;

                         //var tab = Ext.cq1('#cardPlanillero3');
                         var tab =  gr.up().up('tabpanel').down('tabpanel');
                         tab.removeAll();
                         console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',record.data)
////////////////////////////////////////////////////////////////////////////TAB-1/////////////////////////////////////////////
                          var a = tab.add({

                             xtype:'formpanel',
                             itemId:'firstTab',
                             //tabBar: { style:'background:green'},
                             title:'<p style="color:#5fa2dd;">'+e1+'</p>',
                             equipo: e1,
                             equipo_id:id_e1,
                             fecha_id:fecha,
                             fixture_id:record.data.fixture_id,
                             padding:1,
                             url:'http://dario-casa.sytes.net/api/goleadores',
                             items:[{
                               xtype:'toolbar'
                               ,dock: 'top'
                               ,items:[{
                                  xtype:'button'
                                 ,text: 'Goleadores'
                                 ,style:'background-color:#FFF'
                                 ,padding:3
                                 ,handler:function(btn,e){
                                   btn.up().up().down('#fgol').show();
                                   btn.up().up().down('#famo').hide();
                                   btn.up().up().down('#fexp').hide();
                                   btn.up().up().down('#fpen').hide();
                                 }
                               },{
                                 xtype:'button'
                                 ,padding:3
                                 ,text: 'Amonestados'
                                 ,style:'background-color:#FFF'
                                 ,handler:function(btn,e){
                                   btn.up().up().down('#famo').show();
                                   btn.up().up().down('#fgol').setHidden(true);
                                   btn.up().up().down('#fexp').setHidden(true);
                                   btn.up().up().down('#fpen').hide();

                                 }
                               },{
                                 xtype:'button'
                                 ,style:'background-color:#FFF'
                                 ,padding:3
                                 ,text: 'Expulsados'
                                 ,handler:function(btn,e){
                                   btn.up().up().down('#fexp').show();
                                   btn.up().up().down('#famo').hide();
                                   btn.up().up().down('#fgol').hide();
                                   btn.up().up().down('#fpen').hide();

                                 }
                               },{
                                 xtype:'button'
                                 ,padding:3
                                 ,text: 'Penales'
                                 ,style:'background-color:#FFF'
                                 ,handler:function(btn,e){
                                   btn.up().up().down('#fpen').show();
                                   btn.up().up().down('#fexp').hide();
                                   btn.up().up().down('#famo').hide();
                                   btn.up().up().down('#fgol').hide();
                                 }
                               }]
                             },{
                                xtype: 'textfield'
                               ,name: 'fixture_id'
                               ,hidden:true
                               ,value: record.data.fixture_id
                             },{
                               xtype:'fieldset'
                               ,itemId:'fgol'
                               ,title:'<p>GOLEADORES</p>'
                               ,style:'background-color:#5fa2dd'
                               ,items:[
                                 {
                                   xtype:'container'
                                   ,layout:'hbox'
                                  ,items:[{
                                  xtype:'selectfield'
                                 ,width:250
                                 ,label:'<p style:"font-size:9px">Jugador:</p>'
                                 ,store:'Jugadores-Equipo'
                                 ,valueField: 'jugador_id'
                                 ,itemId:'cmbgoljugador'+record.data.equipo1_id
                                 ,listeners:{
                                   change:function(cmb){
                                     if(!Ext.isEmpty(cmb.getValue())){
                                      cmb.up().down('#btnaddgol').setDisabled(false);
                                     }else{
                                       cmb.up().down('#btnaddgol').setDisabled(true);
                                     }
                                   }
                                 }

                               },{
                                 xtype:'button'
                                 ,text:'+'
                                 ,itemId:'btnaddgol'
                                 ,margin: '0 0 0 0'
                                 ,width:50
                                 ,handler:function(btn,e){
                                      var combobox = btn.up().down('#cmbgoljugador'+id_e1);
                                      var v =  btn.up().down('#cmbgoljugador'+id_e1).getValue();
                                      var record = Ext.getStore('Jugadores-Equipo').findRecord('jugador_id', v);
                                      record.set('cant_goles',1);
                                      Ext.getStore('Goleadores').add(record);
                                      btn.up().up().down('#gridGolE1').render();
                                      combobox.reset();
                                 }
                               }]
                             }
                               ,{
                                     xtype:'grid'
                                     ,height:200
                                     ,hideHeaders: true
                                     ,itemId:'gridGolE1'
                                     ,plugins: {
                                       type:'grideditable'
                                       ,enableDeleteButton: false
                                       ,formConfig:{
                                         items:[{
                                           xtype: 'numberfield',
                                           label: 'Goles',
                                           minValue: 1,
                                           maxValue: 150,
                                           name: 'cant_goles'
                                         }]
                                       }

                                     }
                                     ,titleBar: { hidden: true }
                                     ,emptyText:'No hay goleadores cargados'
                                     ,store:'Goleadores'
                                     ,columns:[{
                                        text: 'Id de jugador'
                                        ,name: 'Id de jugador'
                                        ,dataIndex : 'jugador_id'
                                         ,width:150
                                         ,sortable:false
                                        ,hidden:true
                                     },{
                                        text: 'Jugador'
                                        ,name: 'Nombre jugador'
                                        ,dataIndex : 'text'
                                         ,width:180
                                        ,sortable:false
                                     },{
                                        text: 'Goles'
                                        ,name: 'Goles'
                                        ,dataIndex: 'cant_goles'
                                        ,width:60
                                        ,editable: true
                                        ,sortable:false
                                        ,editor: {"xtype":"numberfield","allowBlank":false,"minValue":1,"maxValue":150000}

                                     },{
                                       cell: {
                                              xtype: 'gridcell',
                                              encodeHtml: false
                                          },
                                          tpl: '<i class="fa fa-trash"></i>'
                                          ,width: 60
                                          ,text:'Borrar'
                                     }]
                                     ,listeners:{
                                       itemtap: function(grid, index, target, record, e) {
                                              if(e.target.classList.contains("fa-trash") ||
                                                 e.target.children[0] && e.target.children[0].classList.contains("fa-trash"))
                                              {
                                                  Ext.Msg.confirm("Confirmar", "Desea realmente eliminarlo?", function(btn) {
                                                      if(btn == 'yes') {
                                                          grid.getStore().removeAt(index);
                                                      }
                                                  });
                                              }
                                          }
                                     }
                                 }]
                             },{
                               xtype:'fieldset'
                               ,itemId:'famo'
                               ,title:'<p>AMONESTADOS</p>'
                               ,style:'background-color:#5fa2dd'
                               ,hidden:true
                               ,items:[{
                                 xtype:'container'
                                 ,layout:'hbox'
                                 ,items:[{
                                     xtype:'selectfield'
                                    ,itemId:'cmbamojugador'+record.data.equipo1_id
                                    ,store:'Jugadores-Equipo'
                                    ,label:'<p>Jugador:</p>'
                                    ,width:250
                                    ,valueField: 'jugador_id'
                                    ,listeners:{
                                       change:function(cmb){
                                         if(!Ext.isEmpty(cmb.getValue())){
                                           cmb.up().down('#btnaddamo').setDisabled(false);
                                         }else{
                                            cmb.up().down('#btnaddamo').setDisabled(true);
                                         }
                                       }
                                    }
                               },{
                                 xtype:'button'
                                 ,text:'+'
                                 ,itemId:'btnaddamo'
                                 ,width:50
                                 ,margin: '0 0 0 0'
                                 ,handler:function(btn,e){
                                      var combobox = btn.up().down('#cmbamojugador'+id_e1);
                                      var v =  btn.up().down('#cmbamojugador'+id_e1).getValue();
                                      var record = Ext.getStore('Jugadores-Equipo').findRecord('jugador_id', v);
                                      record.set('cant_tarjetas',1);
                                      Ext.getStore('Amonestados').add(record);
                                      btn.up().up().down('#gridAmoE1').render();
                                      combobox.reset();
                                    }
                                 }]

                               },{
                                     xtype:'grid'
                                     ,itemId:'gridAmoE1'
                                     ,store: 'Amonestados'
                                     ,hideHeaders: true
                                     ,titleBar: { hidden: true }
                                     ,emptyText:'No hay amonestados cargados'
                                     ,height:200
                                     ,columns:[{
                                       text: 'Id de jugador'
                                       ,name: 'Id de jugador'
                                       ,dataIndex : 'jugador_id'
                                       ,sortable:false
                                       ,width:150
                                       ,hidden:true

                                     },{
                                       text: 'Jugador'
                                       ,name: 'Nombre jugador'
                                       ,sortable:false
                                       ,dataIndex: 'text'
                                       ,width:180
                                     },{
                                       text: 'Tarj'
                                       ,name: 'cant_tarjetas'
                                       ,dataIndex: 'cant_tarjetas'
                                       ,sortable:false
                                       ,width:60
                                       ,editable:true
                                       //,editor: {"xtype":"numberfield","allowBlank":false,"minValue":1,"maxValue":150000}
                                     },{
                                       cell: {
                                              xtype: 'gridcell',
                                              encodeHtml: false
                                          },
                                          tpl: '<i class="fa fa-trash"></i>'
                                         ,text:'Borrar'
                                         ,width:60

                                     }]
                                     ,listeners:{
                                       itemtap: function(grid, index, target, record, e) {
                                         console.log('eelelelelelelel');
                                              if(e.target.classList.contains("fa-trash") ||
                                                 e.target.children[0] && e.target.children[0].classList.contains("fa-trash"))
                                              {
                                                  Ext.Msg.confirm("Confirmar", "Desea realmente eliminarlo?", function(btn) {
                                                      if(btn == 'yes') {
                                                          grid.getStore().removeAt(index);
                                                      }
                                                  });
                                              }
                                          }
                                     }
                                 }]
                             },{
                               xtype:'fieldset'
                               ,itemId:'fexp'
                               ,hidden:true
                               ,title:'<p>EXPULSADOS</p>'
                               ,style:'background-color:#5fa2dd'
                               ,collapsed:true
                               ,items:[{
                                    xtype:'container'
                                    ,layout:'hbox'
                                    //,padding:5
                                    ,items:[{
                                     xtype:'selectfield'
                                    ,itemId:'cmbexpjugador'+record.data.equipo1_id
                                    ,store:'Jugadores-Equipo'
                                    ,label:'<p style:"font-size:9px">Jugador:</p>'
                                    ,valueField: 'jugador_id'
                                    ,width:250

                                  	//,autoLoad:true
                                 // ,itemId:'cmbgoljugador'+record.data.equipo1_id
                                    ,listeners:{
                                       change:function(cmb){
                                         if(!Ext.isEmpty(cmb.getValue())){
                                           cmb.up().down('#btnaddexp').setDisabled(false);
                                         }else{
                                            cmb.up().down('#btnaddexp').setDisabled(true);
                                         }
                                       }
                                    }
                               },{
                                 xtype:'button'
                                 ,text:'+'
                                 ,width:50
                                 ,margin: '0 0 0 0'
                                 ,itemId:'btnaddexp'
                                 ,handler:function(btn,e){
                                      var combobox = btn.up().down('#cmbexpjugador'+id_e1);
                                      var v =  btn.up().down('#cmbexpjugador'+id_e1).getValue();
                                      var record = Ext.getStore('Jugadores-Equipo').findRecord('jugador_id', v);

                                      //record.set('cant_fechas',1);
                                      Ext.getStore('Expulsados').add(record);
                                      btn.up().up().down('#gridExpE1').render();
                                      combobox.reset();
                                 }

                               }]
                               },{
                                     xtype:'grid'
                                     ,itemId:'gridExpE1'
                                     ,store: 'Expulsados'
                                     ,emptyText:'No hay expulsados cargados'
                                     ,height:200
                                     ,titleBar: { hidden: true }
                                     ,columns:[{
                                       text: 'Id de jugador'
                                       ,name: 'Id de jugador'
                                       ,dataIndex : 'text'
                                       ,width:180
                                       ,sortable:false
                                       ,hidden:true

                                     },{
                                       text: 'Jugador'
                                       ,name: 'Nombre jugador'
                                       ,dataIndex: 'text'
                                       ,sortable:false
                                       ,width:240

                                     },{
                                       cell: {
                                              xtype: 'gridcell',
                                              encodeHtml: false
                                          },
                                          tpl: '<i class="fa fa-trash"></i>'
                                          ,text:'Borrar'
                                          ,width:60

                                     }]
                                     ,listeners:{
                                       itemtap: function(grid, index, target, record, e) {
                                              if(e.target.classList.contains("fa-trash") ||
                                                 e.target.children[0] && e.target.children[0].classList.contains("fa-trash"))
                                              {
                                                  Ext.Msg.confirm("Confirmar", "Desea realmente eliminarlo?", function(btn) {
                                                      if(btn == 'yes') {
                                                          grid.getStore().removeAt(index);
                                                      }
                                                  });
                                              }
                                          }
                                     }
                                 }]
                             },{
                               xtype:'fieldset'
                               ,itemId:'fpen'
                               ,title: 'Diferencia por penales'
                               ,hidden: true
                               ,layout:'fit'
                               ,items:[{
                                 xtype:'container'
                                 ,items:[{
                                   xtype:'numberfield'
                                   ,label:'Goles'
                                   ,name: 'penales'
                                 }]
                               }]
                             }
                             ,{
                                  xtype:'toolbar'
                                 ,dock:'bottom'
                                 ,items:[{
                                   xtype:'spacer'
                                 },{
                                     xtype:'button'
                                     ,text:'Guardar'
                                     ,margin:'0 50 0 0'
                                     ,style:'background-color:#5fa2dd'
                                     ,handler:function(btn,e){
                                       goleadores = Array();
                                       expulsados = Array();
                                       amonestados = Array();

                                       Ext.getStore('Goleadores').getData().items.forEach(
                                         function(record) {
                                           goleadores.push(record.data);
                                         });
                                         Ext.getStore('Amonestados').getData().items.forEach(
                                           function(record) {
                                             amonestados.push(record.data);
                                           });
                                           Ext.getStore('Expulsados').getData().items.forEach(
                                             function(record) {
                                               expulsados.push(record.data);
                                             });
                                         var obj = {
                                           fixture_id:btn.up('#firstTab').getValues().fixture_id,
                                           fecha_id:btn.up('#firstTab').fecha_id,
                                           equipo_id:btn.up('#firstTab').equipo_id,
                                           goleadores:JSON.stringify(goleadores),
                                           amonestados:JSON.stringify(amonestados),
                                           expulsados:JSON.stringify(expulsados)
                                           ,penales:btn.up('#firstTab').getValues().penales,
                                           // goleadores:"'"+JSON.stringify(goleadores)+"'",
                                           // amonestados:"'"+JSON.stringify(amonestados)+"'",
                                           // expulsados:"'"+JSON.stringify(expulsados)+"'"
                                         }
                                         Ext.Ajax.request({
                                              url: 'http://dario-casa.sytes.net/api/goleadores',
                                              method: 'POST',
                                              params: obj,
                                             // params: {
                                             //       ajax_req: Ext.util.JSON.encode(obj)
                                             //    },
                                              // headers : {
                                              //     'Content-Type' : 'application/json'
                                              //   },
                                               jsonSubmit:true,
                                             // jsonData:true,
                                             //paramsAsJson:true,
                                              success: function(response){
                                                Ext.Msg.show({
                                                   title: 'CORRECTO'
                                                  ,message: 'Se grabaron correctamente los cambios'
                                                  ,buttons: Ext.Msg.OK
                                                });
                                              }
                                              ,failure:function(form, action){
                                                Ext.Msg.show({
                                                   title: 'ATENCION'
                                                  ,message: 'Se produjo un error al grabar los cambios'
                                                  ,buttons: Ext.Msg.OK
                                                });
                                              }

                                          }) ;
                                        }
                                      }]
                                 }]
                           });
///////////////////////////////////////////////////////////////////////////////////TAB-2/////////////////////////////////////////////
                          var  b = tab.add ({
                                 xtype:'formpanel',
                                 title:'<p style=color:#5fa2dd>'+e2+'</p>',
                                 itemId:'secondTab',
                                 equipo: e2,
                                 equipo_id:record.data.equipo2_id,
                                 fecha_id:record.data.fecha_id,
                                 fixture_id:record.data.fixture_id,
                                 url:'http://dario-casa.sytes.net/api/goleadores',
                                 // items:[{
                                 //    xtype: 'textfield'
                                 //   ,name: 'fixture_id'
                                 //  // ,value: '1'
                                 //   ,hidden:true
                                 //   ,value: record.data.fixture_id
                                 // }]
                                 items:[{
                                   xtype:'toolbar'
                                   ,dock: 'top'
                                   ,items:[{
                                      xtype:'button'
                                     ,text: 'Goleadores'
                                     ,style:'background-color:#FFF'
                                     ,padding:3
                                     ,handler:function(btn,e){
                                       btn.up().up().down('#fgol2').show();
                                       btn.up().up().down('#famo2').hide();
                                       btn.up().up().down('#fexp2').hide();
                                       btn.up().up().down('#fpen2').hide();
                                     }
                                   },{
                                     xtype:'button'
                                     ,padding:3
                                     ,text: 'Amonestados'
                                     ,style:'background-color:#FFF'
                                     ,handler:function(btn,e){
                                       btn.up().up().down('#famo2').show();
                                       btn.up().up().down('#fgol2').setHidden(true);
                                       btn.up().up().down('#fexp2').setHidden(true);
                                       btn.up().up().down('#fpen2').hide();

                                     }
                                   },{
                                     xtype:'button'
                                     ,style:'background-color:#FFF'
                                     ,padding:3
                                     ,text: 'Expulsados'
                                     ,handler:function(btn,e){
                                       btn.up().up().down('#fexp2').show();
                                       btn.up().up().down('#famo2').hide();
                                       btn.up().up().down('#fgol2').hide();
                                       btn.up().up().down('#fpen2').hide();

                                     }
                                   },{
                                     xtype:'button'
                                     ,padding:3
                                     ,text: 'Penales'
                                     ,style:'background-color:#FFF'
                                     ,handler:function(btn,e){
                                       btn.up().up().down('#fpen2').show();
                                       btn.up().up().down('#fexp2').hide();
                                       btn.up().up().down('#famo2').hide();
                                       btn.up().up().down('#fgol2').hide();
                                     }
                                   }]
                                 },{
                                    xtype: 'textfield'
                                   ,name: 'fixture_id'
                                   ,hidden:true
                                   ,value: record.data.fixture_id
                                 },{
                                   xtype:'fieldset'
                                   ,itemId:'fgol2'
                                   ,title:'<p>GOLEADORES</p>'
                                   ,style:'background-color:#5fa2dd'
                                   ,items:[
                                     {
                                       xtype:'container'
                                       ,layout:'hbox'
                                      ,items:[{
                                      xtype:'selectfield'
                                     ,width:250
                                     ,label:'<p style:"font-size:9px">Jugador:</p>'
                                     ,store:'Jugadores-Equipo'
                                     ,valueField: 'jugador_id'
                                     ,itemId:'cmbgoljugador'+record.data.equipo2_id
                                     ,listeners:{
                                       change:function(cmb){
                                         if(!Ext.isEmpty(cmb.getValue())){
                                          cmb.up().down('#btnaddgol2').setDisabled(false);
                                         }else{
                                           cmb.up().down('#btnaddgol2').setDisabled(true);
                                         }
                                       }
                                     }

                                   },{
                                     xtype:'button'
                                     ,text:'+'
                                     ,itemId:'btnaddgol2'
                                     ,margin: '0 0 0 0'
                                     ,width:50
                                     ,handler:function(btn,e){
                                          var combobox = btn.up().down('#cmbgoljugador'+id_e2);
                                          var v =  btn.up().down('#cmbgoljugador'+id_e2).getValue();
                                          var record = Ext.getStore('Jugadores-Equipo').findRecord('jugador_id', v);
                                          record.set('cant_goles',1);
                                          Ext.getStore('Goleadores2').add(record);
                                          btn.up().up().down('#gridGolE2').render();
                                          combobox.reset();
                                     }
                                   }]
                                 }
                                   ,{
                                         xtype:'grid'
                                         ,height:200
                                         ,hideHeaders: true
                                         ,itemId:'gridGolE2'
                                         ,plugins: {
                                           type:'grideditable'
                                           ,enableDeleteButton: false
                                           ,formConfig:{
                                             items:[{
                                               xtype: 'numberfield',
                                               label: 'Goles',
                                               minValue: 1,
                                               maxValue: 150,
                                               name: 'cant_goles'
                                             }]
                                           }

                                         }
                                         ,titleBar: { hidden: true }
                                         ,emptyText:'No hay goleadores cargados'
                                         ,store:'Goleadores2'
                                         ,columns:[{
                                            text: 'Id de jugador'
                                            ,name: 'Id de jugador'
                                            ,dataIndex : 'jugador_id'
                                             ,width:150
                                             ,sortable:false
                                            ,hidden:true
                                         },{
                                            text: 'Jugador'
                                            ,name: 'Nombre jugador'
                                            ,dataIndex : 'text'
                                             ,width:180
                                            ,sortable:false
                                         },{
                                            text: 'Goles'
                                            ,name: 'Goles'
                                            ,dataIndex: 'cant_goles'
                                            ,width:60
                                            ,editable: true
                                            ,sortable:false
                                            ,editor: {"xtype":"numberfield","allowBlank":false,"minValue":1,"maxValue":150000}

                                         },{
                                           cell: {
                                                  xtype: 'gridcell',
                                                  encodeHtml: false
                                              },
                                              tpl: '<i class="fa fa-trash"></i>'
                                              ,width: 60
                                              ,text:'Borrar'
                                         }]
                                         ,listeners:{
                                           itemtap: function(grid, index, target, record, e) {
                                                  if(e.target.classList.contains("fa-trash") ||
                                                     e.target.children[0] && e.target.children[0].classList.contains("fa-trash"))
                                                  {
                                                      Ext.Msg.confirm("Confirmar", "Desea realmente eliminarlo?", function(btn) {
                                                          if(btn == 'yes') {
                                                              grid.getStore().removeAt(index);
                                                          }
                                                      });
                                                  }
                                              }
                                         }
                                     }]
                                 },{
                                   xtype:'fieldset'
                                   ,itemId:'famo2'
                                   ,title:'<p>AMONESTADOS</p>'
                                   ,style:'background-color:#5fa2dd'
                                   ,hidden:true
                                   ,items:[{
                                     xtype:'container'
                                     ,layout:'hbox'
                                     ,items:[{
                                         xtype:'selectfield'
                                        ,itemId:'cmbamojugador'+record.data.equipo2_id
                                        ,store:'Jugadores-Equipo'
                                        ,label:'<p>Jugador:</p>'
                                        ,width:250
                                        ,valueField: 'jugador_id'
                                        ,listeners:{
                                           change:function(cmb){
                                             if(!Ext.isEmpty(cmb.getValue())){
                                               cmb.up().down('#btnaddamo2').setDisabled(false);
                                             }else{
                                                cmb.up().down('#btnaddamo2').setDisabled(true);
                                             }
                                           }
                                        }
                                   },{
                                     xtype:'button'
                                     ,text:'+'
                                     ,itemId:'btnaddamo2'
                                     ,width:50
                                     ,margin: '0 0 0 0'
                                     ,handler:function(btn,e){
                                          var combobox = btn.up().down('#cmbamojugador'+id_e2);
                                          var v =  btn.up().down('#cmbamojugador'+id_e2).getValue();
                                          var record = Ext.getStore('Jugadores-Equipo').findRecord('jugador_id', v);
                                          record.set('cant_tarjetas',1);
                                          Ext.getStore('Amonestados2').add(record);
                                          btn.up().up().down('#gridAmoE2').render();
                                          combobox.reset();
                                        }
                                     }]

                                   },{
                                         xtype:'grid'
                                         ,itemId:'gridAmoE2'
                                         ,store: 'Amonestados2'
                                         ,hideHeaders: true
                                         ,titleBar: { hidden: true }
                                         ,emptyText:'No hay amonestados cargados'
                                         ,height:200
                                         ,columns:[{
                                           text: 'Id de jugador'
                                           ,name: 'Id de jugador'
                                           ,dataIndex : 'jugador_id'
                                           ,sortable:false
                                           ,width:150
                                           ,hidden:true

                                         },{
                                           text: 'Jugador'
                                           ,name: 'Nombre jugador'
                                           ,sortable:false
                                           ,dataIndex: 'text'
                                           ,width:180
                                         },{
                                           text: 'Tarj'
                                           ,name: 'cant_tarjetas'
                                           ,dataIndex: 'cant_tarjetas'
                                           ,sortable:false
                                           ,width:60
                                           ,editable:true
                                           //,editor: {"xtype":"numberfield","allowBlank":false,"minValue":1,"maxValue":150000}
                                         },{
                                           cell: {
                                                  xtype: 'gridcell',
                                                  encodeHtml: false
                                              },
                                              tpl: '<i class="fa fa-trash"></i>'
                                             ,text:'Borrar'
                                             ,width:60

                                         }]
                                         ,listeners:{
                                           itemtap: function(grid, index, target, record, e) {
                                             console.log('eelelelelelelel');
                                                  if(e.target.classList.contains("fa-trash") ||
                                                     e.target.children[0] && e.target.children[0].classList.contains("fa-trash"))
                                                  {
                                                      Ext.Msg.confirm("Confirmar", "Desea realmente eliminarlo?", function(btn) {
                                                          if(btn == 'yes') {
                                                              grid.getStore().removeAt(index);
                                                          }
                                                      });
                                                  }
                                              }
                                         }
                                     }]
                                 },{
                                   xtype:'fieldset'
                                   ,itemId:'fexp2'
                                   ,hidden:true
                                   ,title:'<p>EXPULSADOS</p>'
                                   ,style:'background-color:#5fa2dd'
                                   ,collapsed:true
                                   ,items:[{
                                        xtype:'container'
                                        ,layout:'hbox'
                                        //,padding:5
                                        ,items:[{
                                         xtype:'selectfield'
                                        ,itemId:'cmbexpjugador'+record.data.equipo2_id
                                        ,store:'Jugadores-Equipo'
                                        ,label:'<p style:"font-size:9px">Jugador:</p>'
                                        ,valueField: 'jugador_id'
                                        ,width:250

                                        //,autoLoad:true
                                     // ,itemId:'cmbgoljugador'+record.data.equipo2_id
                                        ,listeners:{
                                           change:function(cmb){
                                             if(!Ext.isEmpty(cmb.getValue())){
                                               cmb.up().down('#btnaddexp2').setDisabled(false);
                                             }else{
                                                cmb.up().down('#btnaddexp2').setDisabled(true);
                                             }
                                           }
                                        }
                                   },{
                                     xtype:'button'
                                     ,text:'+'
                                     ,width:50
                                     ,margin: '0 0 0 0'
                                     ,itemId:'btnaddexp2'
                                     ,handler:function(btn,e){
                                          var combobox = btn.up().down('#cmbexpjugador'+id_e2);
                                          var v =  btn.up().down('#cmbexpjugador'+id_e2).getValue();
                                          var record = Ext.getStore('Jugadores-Equipo').findRecord('jugador_id', v);

                                          //record.set('cant_fechas',1);
                                          Ext.getStore('Expulsados2').add(record);
                                          btn.up().up().down('#gridExpE2').render();
                                          combobox.reset();
                                     }

                                   }]
                                   },{
                                         xtype:'grid'
                                         ,itemId:'gridExpE2'
                                         ,store: 'Expulsados2'
                                         ,emptyText:'No hay expulsados cargados'
                                         ,height:200
                                         ,titleBar: { hidden: true }
                                         ,columns:[{
                                           text: 'Id de jugador'
                                           ,name: 'Id de jugador'
                                           ,dataIndex : 'text'
                                           ,width:180
                                           ,sortable:false
                                           ,hidden:true

                                         },{
                                           text: 'Jugador'
                                           ,name: 'Nombre jugador'
                                           ,dataIndex: 'text'
                                           ,sortable:false
                                           ,width:240

                                         },{
                                           cell: {
                                                  xtype: 'gridcell',
                                                  encodeHtml: false
                                              },
                                              tpl: '<i class="fa fa-trash"></i>'
                                              ,text:'Borrar'
                                              ,width:60

                                         }]
                                         ,listeners:{
                                           itemtap: function(grid, index, target, record, e) {
                                                  if(e.target.classList.contains("fa-trash") ||
                                                     e.target.children[0] && e.target.children[0].classList.contains("fa-trash"))
                                                  {
                                                      Ext.Msg.confirm("Confirmar", "Desea realmente eliminarlo?", function(btn) {
                                                          if(btn == 'yes') {
                                                              grid.getStore().removeAt(index);
                                                          }
                                                      });
                                                  }
                                              }
                                         }
                                     }]
                                 },{
                                   xtype:'fieldset'
                                   ,itemId:'fpen2'
                                   ,title: 'Diferencia por penales'
                                   ,hidden: true
                                   ,layout:'fit'
                                   ,items:[{
                                     xtype:'container'
                                     ,items:[{
                                       xtype:'numberfield'
                                       ,label:'Goles'
                                       ,name: 'penales'
                                     }]
                                   }]
                                 }
                                 ,{
                                      xtype:'toolbar'
                                     ,dock:'bottom'
                                     ,items:[{
                                       xtype:'spacer'
                                     },{
                                         xtype:'button'
                                         ,text:'Guardar'
                                         ,margin:'0 50 0 0'
                                         ,style:'background-color:#5fa2dd'
                                         ,handler:function(btn,e){
                                           goleadores = Array();
                                           expulsados = Array();
                                           amonestados = Array();

                                           Ext.getStore('Goleadores2').getData().items.forEach(
                                             function(record) {
                                               goleadores.push(record.data);
                                             });
                                             Ext.getStore('Amonestados2').getData().items.forEach(
                                               function(record) {
                                                 amonestados.push(record.data);
                                               });
                                               Ext.getStore('Expulsados2').getData().items.forEach(
                                                 function(record) {
                                                   expulsados.push(record.data);
                                                 });
                                             var obj = {
                                               fixture_id:btn.up('#secondTab').getValues().fixture_id,
                                               fecha_id:btn.up('#secondTab').fecha_id,
                                               equipo_id:btn.up('#secondTab').equipo_id,
                                               goleadores:JSON.stringify(goleadores),
                                               amonestados:JSON.stringify(amonestados),
                                               expulsados:JSON.stringify(expulsados)
                                               ,penales:btn.up('#secondTab').getValues().penales,
                                               // goleadores:"'"+JSON.stringify(goleadores)+"'",
                                               // amonestados:"'"+JSON.stringify(amonestados)+"'",
                                               // expulsados:"'"+JSON.stringify(expulsados)+"'"
                                             }
                                             Ext.Ajax.request({
                                                  url: 'http://dario-casa.sytes.net/api/goleadores',
                                                  method: 'POST',
                                                  params: obj,
                                                 // params: {
                                                 //       ajax_req: Ext.util.JSON.encode(obj)
                                                 //    },
                                                  // headers : {
                                                  //     'Content-Type' : 'application/json'
                                                  //   },
                                                   jsonSubmit:true,
                                                 // jsonData:true,
                                                 //paramsAsJson:true,
                                                  success: function(response){
                                                    Ext.Msg.show({
                                                       title: 'CORRECTO'
                                                      ,message: 'Se grabaron correctamente los cambios'
                                                      ,buttons: Ext.Msg.OK
                                                    });
                                                  }
                                                  ,failure:function(form, action){
                                                    Ext.Msg.show({
                                                       title: 'ATENCION'
                                                      ,message: 'Se produjo un error al grabar los cambios'
                                                      ,buttons: Ext.Msg.OK
                                                    });
                                                  }

                                              }) ;
                                            }
                                          }]
                                     }]
                           });
                         a.show();
                         gr.up().up('tabpanel').setActiveItem(2);
                         Ext.getStore('Jugadores-Equipo').load({params:{'equipo_id':record.data.equipo1_id}});
                       }
                     }

                }]

            },{
                title: '<a style=color:#5fa2dd>.</a>',
                 layout: 'fit',
                 items:[{
                    xtype:'tabpanel'
                    ,padding:0
                    ,tabBar:{
                      style: 'background:#6c757d;'
                    }
                    ,defaults: {
                        tab: {
                          style:'color:#565656'
                          ,padding:5
                        }
                      }
                      ,listeners:{
                        activeItemchange:function(panel,value, oldValue,e){
                          console.log('Se  activo',panel,value);
                          Ext.getStore('Jugadores-Equipo').load({params:{'equipo_id':value.equipo_id}});
                          // if(panel.itemId=='firstTab'){
                          //   Ext.getStore('Jugadores-Equipo').load({params:{'equipo_id':equipo_id}});
                          // }else{
                          //   Ext.getStore('Jugadores-Equipo').load({params:{'equipo_id':equipo_id2}});
                          // }
                        }
                      }
                  }]
                ,listeners:{

                  activate: function (panel,e){
                      var fixture_id = panel.down('#firstTab').fixture_id,
                          fecha_id = panel.down('#firstTab').fecha_id,
                          equipo_id = panel.down('#firstTab').equipo_id;

                      Ext.getStore('Goleadores').load({params:{fixture_id:fixture_id,fecha_id:fecha_id,equipo_id:equipo_id}}); //TODO
                      Ext.getStore('Amonestados').load({params:{fixture_id:fixture_id,fecha_id:fecha_id,equipo_id:equipo_id}});
                      Ext.getStore('Expulsados').load({params:{fixture_id:fixture_id,fecha_id:fecha_id,equipo_id:equipo_id}});
                      var fixture_id2 = panel.down('#secondTab').fixture_id,
                          fecha_id2 = panel.down('#secondTab').fecha_id,
                          equipo_id2 = panel.down('#secondTab').equipo_id;

                      Ext.getStore('Goleadores2').load({params:{fixture_id:fixture_id2,fecha_id:fecha_id2,equipo_id:equipo_id2}}); //TODO
                      Ext.getStore('Amonestados2').load({params:{fixture_id:fixture_id2,fecha_id:fecha_id2,equipo_id:equipo_id2}});
                      Ext.getStore('Expulsados2').load({params:{fixture_id:fixture_id2,fecha_id:fecha_id2,equipo_id:equipo_id2}});
                    // Ext.getStore('Goleadores').load({params:{fixture_id:record.data.fixture_id,fecha_id:record.data.fecha_id,equipo_id:record.data.equipo_id}});

                   }
                }
           }]
        }
});
