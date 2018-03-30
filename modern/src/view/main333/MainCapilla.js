
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
      ,width:100
    },{
      text: 'Nombre'
      ,name: 'jugador_nombre'
      ,dataIndex : 'jugador_nombre'
      //,flex: 1
      ,width:100
    },{
      text: 'Apellido'
      ,name: 'jugador_apellido'
      ,dataIndex : 'jugador_apellido'
      //,flex: 1
      ,width:100
    },{
      text: 'Equipo'
      ,name: 'equipo'
      ,dataIndex : 'equipo'
      //,flex: 1
      ,width:100
    },{
      text: 'Cantidad de Amarillaas'
      ,name: 'cantamarillas'
      ,dataIndex : 'cantamarillas'
      //,flex: 1
      ,width:100
    }]
  	// }]
});
