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
      ,url: 'http://127.0.0.1:8080/posiciones'
      ,method: 'GET'
        ,reader: {
            type: 'json',
            rootProperty: 'posiciones'
        }
    }
});
