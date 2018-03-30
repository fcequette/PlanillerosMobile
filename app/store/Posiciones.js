Ext.define('Plani.store.Posiciones', {
    extend: 'Ext.data.Store',

    alias: 'store.posiciones',
    storeId:'Posiciones',
    // fields: [
    //     'name', 'email', 'phone'
    // ],
//autoLoad:true,

    proxy: {
      type: 'ajax'
      ,url: 'http://dario-casa.sytes.net/api/posiciones'
      ,method: 'GET'
        ,reader: {
            type: 'json',
            rootProperty: 'posiciones'
        }
    }
});
