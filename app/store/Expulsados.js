Ext.define('Plani.store.Expulsados', {
	 extend: 'Ext.data.Store'
	,storeId: 'Expulsados'
	//,model:'Torneo.model.Expulsado'
	,proxy: {
		 type: 'ajax'
	,url: 'http://127.0.0.1:8080/expulsados'
		//,url: 'https://api.myjson.com/bins/xtmp7'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'expulsados'
	}
	 }
});
