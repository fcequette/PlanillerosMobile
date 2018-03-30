Ext.define('Plani.store.Fechas', {
	 extend: 'Ext.data.Store'
	,storeId: 'Fechas'
	,proxy: {
		 type: 'ajax'
	,url: 'http://dario-casa.sytes.net/api/fecha'
	//,url: 'http://localhost:8080/zonas'

	//,url: 'https://api.myjson.com/bins/byt07'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'fecha'
	}
	 }
});
