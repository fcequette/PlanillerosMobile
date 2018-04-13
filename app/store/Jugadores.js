Ext.define('Plani.store.Jugadores', {
	 extend: 'Ext.data.Store'
	,storeId: 'Jugadores'
	,autoLoad:true
	,proxy: {
		 type: 'ajax'
	 ,url: 'http://127.0.0.1:8080/jugador'
	 //,url: 'http://localhost:8080/jugadores'

	//,url: 'https://api.myjson.com/bins/kz1m3'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'children'
	}
	 }
});
