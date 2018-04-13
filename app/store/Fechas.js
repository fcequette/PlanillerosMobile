Ext.define('Plani.store.Fechas', {
	 extend: 'Ext.data.Store'
	,storeId: 'Fechas'
	,proxy: {
		 type: 'ajax'
	,url: 'http://127.0.0.1:8080/fecha'
	//,url: 'http://localhost:8080/zonas'

	//,url: 'https://api.myjson.com/bins/byt07'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'fecha'
	}
	 }
});
