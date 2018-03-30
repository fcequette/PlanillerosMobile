
Ext.define('Plani.view.main.MainVuelven', {
     extend: 'Ext.grid.Grid'
    ,xtype: 'mainvuelven'
    ,store: 'Vuelven'
    ,heigth:600

   ,emptyText: '<p style="color:red;font-size:15px;margin-top:110px;margin-left:10px;">No hay jugadores que vuelvan de sanción para la categoria</p>'
    ,columns:[{
      text: 'Jugador Id'
      ,name: 'jugador_id'
      ,dataIndex : 'jugador_id'
      //,flex: 1
      ,width:100
      ,hidden:true
      ,sortable:false

    },{
      text: 'Jugador'
      ,name: 'text'
      ,dataIndex : 'text'
      ,width:150
      ,sortable:false

    },{
      text: 'Equipo'
      ,name: 'equipo'
      ,dataIndex : 'equipo'
      ,width:150
      ,sortable:false

    }]
  	// }]
});
