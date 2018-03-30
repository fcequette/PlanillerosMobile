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
                //title: '<a style=color:#5fa2dd>.</a>',
				//glyph: 'xe600@Linearicons',
				iconCls: 'x-fa fa-home',
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
                            Ext.getStore('PartidosFecha').removeAll();
                             Ext.getStore('PartidosFecha').reload({params:btn.up('formpanel').getValues(),callback:function(a,b,c){
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
                        }
                     }]
                  }]

            },
            {
              //title: '<a style=color:#5fa2dd>.</a>',
				iconCls: 'x-fa fa-list',
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
						             var fixture_id = record.data.fixture_id;
                         //var tab = Ext.cq1('#cardPlanillero3');
                         var tab =  gr.up().up('tabpanel').down('tabpanel');
                         tab.removeAll();
                          Ext.getStore('Goleadores').removeAll();
                           Ext.getStore('Amonestados').removeAll();
                           Ext.getStore('Expulsados').removeAll();
                           Ext.getStore('Goleadores2').removeAll();
                            Ext.getStore('Amonestados2').removeAll();
                            Ext.getStore('Expulsados2').removeAll();
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
								   Ext.getStore('Goleadores').load({params:{fixture_id:fixture_id,fecha_id:fecha,equipo_id:id_e1}});
									Ext.getStore('Jugadores-Equipo').clearFilter();

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
									Ext.getStore('Amonestados').load({params:{fixture_id:fixture_id,fecha_id:fecha,equipo_id:id_e1}});

									  Ext.getStore('Jugadores-Equipo').filterBy(function(rec){
											if(rec.get('jugador_id') !="0"){
												console.log('lalala');
												return rec;
											}
									  });
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
                                   //filtra los   en  contra
                								   Ext.getStore('Expulsados').load({params:{fixture_id:fixture_id,fecha_id:fecha,equipo_id:id_e1}});
                								   Ext.getStore('Jugadores-Equipo').filterBy(function(rec){
                											if(rec.get('jugador_id') !="0"){
                												return rec;
                											}else{
                												console.log('En Contra');
                											}
                									  });

								 }
                                 },{
								xtype:'button',
								text:'AUSENTE'
								,padding:3
								,style:'background-color:#FFF'
								,handler:function(btn,e){
									Ext.Msg.confirm("CONFIRMAR", "¿El Equipo está ausente?",function(btnText){
										if(btnText === "yes"){
											 var myObj = {
												 equipo_id:id_e1,
												 fecha_id:fecha,
												 fixture_id:fixture_id

												};
												Ext.Ajax.request({
												   url: 'http://dario-casa.sytes.net/api/nosepresenta'
												  ,jsonData: myObj
												  ,callback: function( opt, success, response ) {
													var json = Ext.decode(response.responseText);
													if ( response.status === 201 ) {
													  if ( json.success ) {
														Ext.Msg.show({
														  title:'ATENCIÓN'
														  ,message: 'Se ha establecido que el equipo no se presento'
														  ,buttons: Ext.Msg.OK
														  ,icon: Ext.Msg.INFO
														});
														Ext.ComponentQuery.query('mainplanilleros')[0].setActiveItem(1);
													  }
													}
												  }
												  ,failure : function( opt, success, response ) {
													Ext.Msg.show({
													  title:'Error'
													  ,message: 'No se ha establecido que el equipo no se presento, por favor intente nuevamente '
													  ,buttons: Ext.Msg.OK
													  ,icon: Ext.Msg.ERROR
													});
												  }
											});

										}

									});
								}

                               },{
                                 xtype:'button'
                                 ,padding:3
                                 ,text: 'Penales'
                                 ,hidden:true
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
							                 ,width:310
                               ,itemId:'fgol'
                               ,title:'<p  style="color:#FFF";>GOLEADORES1</p>'
                               ,style:'background-color:#5fa2dd'
                               ,items:[ {
                                 xtype:'container'
                                 ,layout:'hbox'
                                 ,items:[{
                                      xtype:'selectfield'
                                      ,width:250
                    									  //,height: 500
                    									  ,usePicker: false
                    									  ,defaultTabletPickerConfig: {
                    								            centered: true,// tabletPicker is floating panel
                    											height: 500,
                    											minHeight: 500
                    									  }
                                      ,label:'<p>Jugador:</p>'
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
                                        var recordgol = Ext.getStore('Goleadores').findRecord('jugador_id', v);
                                        if(recordgol){
                                          recordgol.set('cant_goles',parseInt(recordgol.get('cant_goles'))+1);
                                          Ext.ComponentQuery.query('#gridGolE1')[0].getStore().add(recordgol);
                                        }else{
                    											 if(v==0){
                    												 var record = Ext.getStore('Jugadores-Equipo').findRecord('jugador_id', v);
                    												 record.set('cant_goles',1);
                    											 } else{
                    												var record = Ext.getStore('Jugadores').findRecord('jugador_id', v);
                    												if(record){ record.set('cant_goles',1); }
                    											 }
                                          Ext.ComponentQuery.query('#gridGolE1')[0].getStore().add(record);
                                       }
                                       Ext.ComponentQuery.query('#btnSavePlani')[0].fireEvent('tap',Ext.ComponentQuery.query('#btnSavePlani')[0]);
									                     Ext.ComponentQuery.query('#gridGolE1')[0].render();
                                        Ext.ComponentQuery.query('#gridGolE1')[0].getStore().load();
                                      // combobox.reset();
                                    }
                               }]
                             },{
                                 xtype:'grid'
                                 ,height:200
                                 ,hideHeaders: true
                                 ,itemId:'gridGolE1'
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
								                      ,sortable:false
                                 }]
                                 ,listeners:{
                                   itemtap: function(grid, index, target, record, e) {
                                          if(e.target.classList.contains("fa-trash") ||
                                             e.target.children[0] && e.target.children[0].classList.contains("fa-trash"))
                                          {
                                              Ext.Msg.confirm("Confirmar", "Desea realmente eliminarlo?", function(btn) {
                                                  if(btn == 'yes') {
                                                      grid.getStore().removeAt(index);
                                                      Ext.ComponentQuery.query('#btnSavePlani')[0].fireEvent('tap',Ext.ComponentQuery.query('#btnSavePlani')[0]);
                                                  }
                                              });
                                          }
                                      }
                                 }
                             }]
                        },{
                           xtype:'fieldset'
							             ,width:310
                           ,itemId:'famo'
                           ,title:'<p style="color:#FFF;">AMONESTADOS1</p>'
                           ,style:'background-color:#5fa2dd'
                           ,hidden:true
                           ,items:[{
                                 xtype:'container'
                                 ,layout:'hbox'
                                 ,items:[{
                                     xtype:'selectfield'
                                    ,itemId:'cmbamojugador'+record.data.equipo1_id
                                    ,store:'Jugadores-Equipo'
																		  ,usePicker: false
                  									  ,defaultTabletPickerConfig: {
                  								            centered: true,// tabletPicker is floating panel
                  											height: 500,
                  											minHeight: 500
                  									  }
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
                                      var recordgol = Ext.getStore('Amonestados').findRecord('jugador_id', v);
                                      if(recordgol){
                                        var t = parseInt(recordgol.get('cant_tarjetas')) + 1;
                                        recordgol.set('cant_tarjetas',t);
                                        Ext.ComponentQuery.query('#gridAmoE1')[0].getStore().add(recordgol);
                                      }else{
                                        var record = Ext.getStore('Jugadores').findRecord('jugador_id', v);
                                        record.set('cant_tarjetas',1);
                                        Ext.ComponentQuery.query('#gridAmoE1')[0].getStore().add(record);
                                     }
                                     Ext.ComponentQuery.query('#btnSavePlani')[0].fireEvent('tap',Ext.ComponentQuery.query('#btnSavePlani')[0]);
                                     Ext.ComponentQuery.query('#gridAmoE1')[0].render();
                                    Ext.ComponentQuery.query('#gridAmoE1')[0].getStore().load();
                                     //combobox.reset();
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
										                     ,sortable:false

                                     }]
                                     ,listeners:{
                                       itemtap: function(grid, index, target, record, e) {
                                              if(e.target.classList.contains("fa-trash") ||
                                                 e.target.children[0] && e.target.children[0].classList.contains("fa-trash"))
                                              {
                                                  Ext.Msg.confirm("Confirmar", "Desea realmente eliminarlo?", function(btn) {
                                                      if(btn == 'yes') {
                                                          grid.getStore().removeAt(index);
                                                          Ext.ComponentQuery.query('#btnSavePlani')[0].fireEvent('tap',Ext.ComponentQuery.query('#btnSavePlani')[0]);
                                                      }
                                                  });
                                              }
                                          }
                                     }
                                 }]
                             },{
                               xtype:'fieldset'
							                 ,width:310
                               ,itemId:'fexp'
                               ,hidden:true
                               ,title:'<p  style="color:#FFF">EXPULSADOS1</p>'
                               ,style:'background-color:#5fa2dd'
                               ,collapsed:true
                               ,items:[{
                                    xtype:'container'
                                    ,layout:'hbox'
                                    //,padding:5
                                    ,items:[{
                                     xtype:'selectfield'
									 									  ,usePicker: false
                  									  ,defaultTabletPickerConfig: {
                  								      centered: true,// tabletPicker is floating panel
                  											height: 500,
                  											minHeight: 500
                  									  }
                                    ,itemId:'cmbexpjugador'+record.data.equipo1_id
                                    ,store:'Jugadores-Equipo'
                                    ,label:'<p style:"font-size:9px">Jugador:</p>'
                                    ,valueField: 'jugador_id'
                                    ,width:250
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
                                      var recordgol = Ext.getStore('Expulsados').findRecord('jugador_id', v);
                                      if(recordgol){
                                       console.log('El jugador ya fue expulsado');
                                      }else{
                                        var record = Ext.getStore('Jugadores').findRecord('jugador_id', v);
                                        record.set('cant_fechas',9999);
                                        Ext.ComponentQuery.query('#gridExpE1')[0].getStore().add(record);
                                     }
                                     Ext.ComponentQuery.query('#btnSavePlani')[0].fireEvent('tap',Ext.ComponentQuery.query('#btnSavePlani')[0]);
                                     Ext.ComponentQuery.query('#gridExpE1')[0].render();
                                     Ext.ComponentQuery.query('#gridExpE1')[0].getStore().load();
                                    // combobox.reset();
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
										                      ,sortable:false

                                     }]
                                     ,listeners:{
                                       itemtap: function(grid, index, target, record, e) {
                                              if(e.target.classList.contains("fa-trash") ||
                                                 e.target.children[0] && e.target.children[0].classList.contains("fa-trash"))
                                              {
                                                  Ext.Msg.confirm("Confirmar", "Desea realmente eliminarlo?", function(btn) {
                                                      if(btn == 'yes') {
                                                          grid.getStore().removeAt(index);
                                                          Ext.ComponentQuery.query('#btnSavePlani')[0].fireEvent('tap',Ext.ComponentQuery.query('#btnSavePlani')[0]);
                                                      }
                                                  });
                                              }
                                          }
                                     }
                                 }]
                             },{
                               xtype:'fieldset'
							                 ,width:310
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
                                  ,hidden:true
                                 ,items:[{
                                   xtype:'spacer'
                                 },{
                                     xtype:'button'
                                     ,text:'<p style="color:#FFF;">Guardar</p>'
                                     ,itemId:'btnSavePlani'
                                     // ,hidden:true
                                     ,margin:'0 50 0 0'
                                     ,style:'background-color:#5fa2dd'
                                     ,listeners:{


                                     tap:function(btn,e){
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
                									    Ext.getStore('Goleadores2').load({params:{fixture_id:fixture_id,fecha_id:fecha,equipo_id:id_e2}});
										                  Ext.getStore('Jugadores-Equipo').clearFilter();
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
									    Ext.getStore('Amonestados2').load({params:{fixture_id:fixture_id,fecha_id:fecha,equipo_id:id_e2}});
										Ext.getStore('Jugadores-Equipo').filterBy(function(rec){
											if(rec.get('jugador_id') !="0"){
												console.log('lalala');
												return rec;
											}else{
												console.log('555');
											}
									  });

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
									   Ext.getStore('Expulsados2').load({params:{fixture_id:fixture_id,fecha_id:fecha,equipo_id:id_e2}});
									   Ext.getStore('Jugadores-Equipo').filterBy(function(rec){
											if(rec.get('jugador_id') !="0"){
												console.log('lalala');
												return rec;
											}else{
												console.log('555');
											}
									  });

                                     }
                                   },{
									   xtype:'button',
								text:'AUSENTE'
								,padding:3
								,style:'background-color:#FFF'
								,handler:function(btn,e){
									Ext.Msg.confirm("CONFIRMAR", "¿El Equipo está ausente?",function(btnText){
										if(btnText === "yes"){
											 var myObj = {
												 equipo_id:id_e2,
												 fecha_id:fecha,
												 fixture_id:fixture_id

												};
												Ext.Ajax.request({
												   url: 'http://dario-casa.sytes.net/api/nosepresenta'
												  ,jsonData: myObj
												  ,callback: function( opt, success, response ) {
													var json = Ext.decode(response.responseText);
													if ( response.status === 201 ) {
													  if ( json.success ) {
														Ext.Msg.show({
														  title:'ATENCIÓN'
														  ,message: 'Se ha establecido que el equipo no se presento'
														  ,buttons: Ext.Msg.OK
														  ,icon: Ext.Msg.INFO
														});
														Ext.ComponentQuery.query('mainplanilleros')[0].setActiveItem(1);
													  }
													}
												  }
												  ,failure : function( opt, success, response ) {
													Ext.Msg.show({
													  title:'Error'
													  ,message: 'No se ha establecido que el equipo no se presento, por favor intente nuevamente '
													  ,buttons: Ext.Msg.OK
													  ,icon: Ext.Msg.ERROR
													});
												  }
											});

										}

									});
								}
								   },
								   {
                                     xtype:'button'
                                     ,padding:3
                                     ,text: 'Penales'
                                     ,hidden:true
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
								                   ,width:310
                                   ,itemId:'fgol2'
                                   ,title:'<p style="color:#FFF">GOLEADORES2</p>'
                                   ,style:'background-color:#5fa2dd'
                                   ,items:[
                                     {
                                       xtype:'container'
                                       ,layout:'hbox'
                                      ,items:[{
                                      xtype:'selectfield'
									  									  ,usePicker: false
									                     ,defaultTabletPickerConfig: {
								                         centered: true,// tabletPicker is floating panel
                    											height: 500,
                    											minHeight: 500
                    									  }
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
                                       var recordgol = Ext.getStore('Goleadores2').findRecord('jugador_id', v);
                                       if(recordgol){
                                         recordgol.set('cant_goles',parseInt(recordgol.get('cant_goles'))+1);
                                         Ext.ComponentQuery.query('#gridGolE2')[0].getStore().add(recordgol);
                                       }else{
                  											 if(v==0){
                  												 var record = Ext.getStore('Jugadores-Equipo').findRecord('jugador_id', v);
                  												 record.set('cant_goles',1);
                  											 } else{
                  												var record = Ext.getStore('Jugadores').findRecord('jugador_id', v);
                  												if(record){ record.set('cant_goles',1); }
                  											 }
                                         Ext.ComponentQuery.query('#gridGolE2')[0].getStore().add(record);
                                      }
                                      Ext.ComponentQuery.query('#btnSavePlani2')[0].fireEvent('tap',Ext.ComponentQuery.query('#btnSavePlani2')[0]);
                                      Ext.ComponentQuery.query('#gridGolE2')[0].render();
                                      Ext.ComponentQuery.query('#gridGolE2')[0].getStore().load();
                                      //combobox.reset();
                                     }
                                    // }
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
											                        ,sortable:false
                                         }]
                                         ,listeners:{
                                           itemtap: function(grid, index, target, record, e) {
                                                  if(e.target.classList.contains("fa-trash") ||
                                                     e.target.children[0] && e.target.children[0].classList.contains("fa-trash"))
                                                  {
                                                      Ext.Msg.confirm("Confirmar", "¿Desea realmente eliminarlo?", function(btn) {
                                                          if(btn == 'yes') {
                                                              grid.getStore().removeAt(index);
                                                              Ext.ComponentQuery.query('#btnSavePlani2')[0].fireEvent('tap',Ext.ComponentQuery.query('#btnSavePlani2')[0]);

                                                          }
                                                      });
                                                  }
                                              }
                                         }
                                     }]
                                 },{
                                   xtype:'fieldset'
								                   ,width:310
                                   ,itemId:'famo2'
                                   ,title:'<p style="color:#FFF;">AMONESTADOS2</p>'
                                   ,style:'background-color:#5fa2dd'
                                   ,hidden:true
                                   ,items:[{
                                     xtype:'container'
                                     ,layout:'hbox'
                                     ,items:[{
                                         xtype:'selectfield'
                                        									  ,usePicker: false
									  ,defaultTabletPickerConfig: {
								            centered: true,// tabletPicker is floating panel
											height: 500,
											minHeight: 500
									  }
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
                                            var recordgol = Ext.getStore('Amonestados2').findRecord('jugador_id', v);
                                            if(recordgol){
                                              var t = parseInt(recordgol.get('cant_tarjetas')) + 1;
                                              recordgol.set('cant_tarjetas',t);
                                              Ext.ComponentQuery.query('#gridAmoE2')[0].getStore().add(recordgol);
                                            }else{
                                              var record = Ext.getStore('Jugadores').findRecord('jugador_id', v);
                                              record.set('cant_tarjetas',1);
                                              Ext.ComponentQuery.query('#gridAmoE2')[0].getStore().add(record);
                                           }
                                           Ext.ComponentQuery.query('#btnSavePlani2')[0].fireEvent('tap',Ext.ComponentQuery.query('#btnSavePlani2')[0]);
                                           Ext.ComponentQuery.query('#gridAmoE2')[0].render();
                                           Ext.ComponentQuery.query('#gridAmoE2')[0].getStore().load();
                                           //combobox.reset();
                                          }
                                        //}
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
											 ,sortable:false

                                         }]
                                         ,listeners:{
                                           itemtap: function(grid, index, target, record, e) {
                                                  if(e.target.classList.contains("fa-trash") ||
                                                     e.target.children[0] && e.target.children[0].classList.contains("fa-trash"))
                                                  {
                                                      Ext.Msg.confirm("Confirmar", "Desea realmente eliminarlo?", function(btn) {
                                                          if(btn == 'yes') {
                                                              grid.getStore().removeAt(index);
                                                              Ext.ComponentQuery.query('#btnSavePlani2')[0].fireEvent('tap',Ext.ComponentQuery.query('#btnSavePlani2')[0]);
                                                          }
                                                      });
                                                  }
                                              }
                                         }
                                     }]
                                 },{
                                    xtype:'fieldset'
								                   ,width:310
                                   ,itemId:'fexp2'
                                   ,hidden:true
                                   ,title:'<p style="color:#FFF">EXPULSADOS2</p>'
                                   ,style:'background-color:#5fa2dd'
                                   ,collapsed:true
                                   ,items:[{
                                        xtype:'container'
                                        ,layout:'hbox'
                                        //,padding:5
                                        ,items:[{
                                         xtype:'selectfield'
										 									  ,usePicker: false
                    									  ,defaultTabletPickerConfig: {
                    								            centered: true,// tabletPicker is floating panel
                    											height: 500,
                    											minHeight: 500
                    									  }
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
                                          var recordgol = Ext.getStore('Expulsados2').findRecord('jugador_id', v);
                                          if(recordgol){
                                           console.log('El jugador ya fue expulsado');
                                          }else{
                                            var record = Ext.getStore('Jugadores').findRecord('jugador_id', v);
                                            record.set('cant_fechas',9999);
                                            Ext.ComponentQuery.query('#gridExpE2')[0].getStore().add(record);
                                         }
                                         Ext.ComponentQuery.query('#btnSavePlani2')[0].fireEvent('tap',Ext.ComponentQuery.query('#btnSavePlani2')[0]);
                                         Ext.ComponentQuery.query('#gridExpE2')[0].render();
                                         Ext.ComponentQuery.query('#gridExpE2')[0].getStore().load();
                                         //combobox.reset();
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
											                        ,sortable:false

                                         }]
                                         ,listeners:{
                                           itemtap: function(grid, index, target, record, e) {
                                                  if(e.target.classList.contains("fa-trash") ||
                                                     e.target.children[0] && e.target.children[0].classList.contains("fa-trash"))
                                                  {
                                                      Ext.Msg.confirm("Confirmar", "Desea realmente eliminarlo?", function(btn) {
                                                          if(btn == 'yes') {
                                                              grid.getStore().removeAt(index);
                                                              Ext.ComponentQuery.query('#btnSavePlani2')[0].fireEvent('tap',Ext.ComponentQuery.query('#btnSavePlani2')[0]);

                                                          }
                                                      });
                                                  }
                                              }
                                         }
                                     }]
                                 },{
                                   xtype:'fieldset'
								                   ,width:310
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
                                     ,hidden:true
                                     ,items:[{
                                       xtype:'spacer'
                                     },{
                                         xtype:'button'
                                        ,text:'Guardar'
                                          ,itemId:'btnSavePlani2'
                                         ,margin:'0 50 0 0'
                                         ,style:'background-color:#5fa2dd'
                                         ,listeners:{
                                          tap:function(btn,e){
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
               // title: '<a style=color:#5fa2dd>.</a>',
                 iconCls: 'x-fa fa-edit',
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
						              ,width:150
                        }
                      }
                      ,listeners:{
                        activeItemchange:function(panel,value, oldValue,e){
                          console.log('***************************',value.equipo_id)
                          Ext.getStore('Jugadores-Equipo').load({params:{'equipo_id':value.equipo_id}});
                        }
                        ,itemtap: function() {
                          console.log('item tap!');
                        }
                      }
                  }]
                ,listeners:{

                  activate : function (panel,e){
                    console.log('SE ACTIVOOOOOOOOOOOOOOOOOOOOOO',panel);
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
