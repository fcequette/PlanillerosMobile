Ext.define('Plani.store.Expulsados', {
	 extend: 'Ext.data.Store'
	,storeId: 'Expulsados'
	//,model:'Torneo.model.Expulsado'
	,proxy: {
		 type: 'ajax'
	,url: 'http://dario-casa.sytes.net/api/expulsados'
		//,url: 'https://api.myjson.com/bins/xtmp7'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'expulsados'
	}
	 }
});
