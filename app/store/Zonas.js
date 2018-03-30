Ext.define('Plani.store.Zonas', {
	 extend: 'Ext.data.Store'
	,storeId: 'Zonas'
	//,model:'Torneo.model.Zona'
	,proxy: {
		 type: 'ajax'
		,url: 'http://dario-casa.sytes.net/api/zona'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'zonas'
		 }
	 }
});
