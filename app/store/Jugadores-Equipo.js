Ext.define('Plani.store.Jugadores-Equipo', {
	 extend: 'Ext.data.Store'
	,storeId: 'Jugadores-Equipo'
	,model:'Plani.model.JugadoresEquipo'
	//,autoLoad:true
	,proxy: {
		 type: 'ajax'
	  ,url: 'http://127.0.0.1:8080/jugadores-equipo'
	// ,url:'http://127.0.0.1:8080/jugadores-equipo?_dc=1515543305365&equipo_id=10&page=1&start=0&limit=25'
	 //,url: 'http://localhost:8080/jugadores'

	//,url: 'https://api.myjson.com/bins/kz1m3'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'jugadores'
	}
	 }
});
