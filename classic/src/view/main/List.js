/**
 * This view is an example list of people.
 */
Ext.define('Plani.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'Plani.store.Posiciones'
    ],

    title: 'Posiciones',

    store: {
        type: 'posiciones'
    }

    ,columns: [
      { text: '', dataIndex: 'pos', width:40},
       { text: 'Id  ', dataIndex: 'equipo_id', flex: 1 ,hidden:true},
       { text: 'Nombre equipo  ', dataIndex: 'equipo_nombre', flex: 2 },
       { text: 'Ptos',  dataIndex: 'ptos', width:50  },
       { text: 'P.Jugados', dataIndex: 'pj',width:85  },
       { text: 'P. Ganados', dataIndex: 'pg', width:85 },
       { text: 'P. empatados', dataIndex: 'pe', flex: 1 },
       { text: 'P. perdidos', dataIndex: 'pp', flex: 1 },
       { text: 'Goles a favor', dataIndex: 'gf', flex: 1 },
       { text: 'Goles en  contra ', dataIndex: 'gc', flex: 1 },
       { text: 'Diferencia de goles ', dataIndex: 'dif', flex: 1 }
    ],

    listeners: {
        select: 'onItemSelected'
    }
});
