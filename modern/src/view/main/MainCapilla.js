
Ext.define('Plani.view.main.MainCapilla', {
     extend: 'Ext.grid.Grid'
    ,xtype: 'maincapilla'
    ,store: 'Capilla'
    ,emptyText: '<p style="color:red;font-size:15px;margin-top:150px;margin-left:10px;">No hay  jugadores  en capillla para la categoria</p>'

   ,height:600
    ,columns:[{
      text: 'Jugador Id'
      ,name: 'jugador_id'
      ,dataIndex : 'jugador_id'
      //,flex: 1
      ,width:150
      ,hidden:true
    },{
      text: 'Jugador'
      ,name: 'text'
      ,dataIndex : 'text'
      ,sortable:false

      //,flex: 1
      ,width:150
    },{
      text: 'Equipo'
      ,name: 'equipo'
      ,dataIndex : 'equipo'
      //,flex: 1
      ,sortable:false
      ,width:150
    },{
      text: ' Amarillas'
      ,name: 'cantamarillas'
      ,dataIndex : 'cantamarillas'
      //,flex: 1
      ,width:80
    }]
  	// }]
});
