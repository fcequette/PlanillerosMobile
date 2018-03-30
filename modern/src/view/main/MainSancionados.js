
Ext.define('Plani.view.main.MainSancionados', {
     extend: 'Ext.grid.Grid'
    ,xtype: 'sancionados'
    ,store: 'Sancionados'
   // ,heigth:600

    //     ,xtype:'grid'
    //     //,title:'Sancionados'
    //     ,store: 'Sancionados'
       ,emptyText:'<p style="color:red;font-size:15px;margin-top:140px;margin-left:10px;">No hay expulsados cargados</p>'
        //,height:200
        ,fullscrean:true
        ,titleBar: { hidden: true }
        //,layout:'fit'

        ,columns:[{
          text: 'Id de jugador'
          ,name: 'Id de jugador'
          ,dataIndex : 'text'
          ,width:30
          ,hidden:true
          ,sortable:false

        },{
          text: 'Jugador'
          ,name: 'jugador_nombre'
          ,dataIndex: 'jugador_nombre'
          ,width:150
          ,sortable:false

        },{
          text: 'Equipo'
          ,name: 'equipo_nombre'
          ,dataIndex: 'equipo_nombre'
          ,width:150
          ,sortable:false

        },{
          text: 'Vuelve'
          ,name: 'sancionados_vuelve'
          ,dataIndex: 'sancionados_vuelve'
          ,width:80
          ,sortable:false

        },{
          text: 'Sancion'
          ,name: 'Nombre jugador'
          ,dataIndex: 'sancion'
          ,width:80
          ,sortable:false

        }]
});
