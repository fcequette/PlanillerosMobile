Ext.define('Plani.store.Amonestados2', {
	 extend: 'Ext.data.Store'
	,storeId: 'Amonestados2'
	,model:'Plani.model.Amonestado'
	,proxy: {
		 type: 'ajax'
	,url: 'http://dario-casa.sytes.net/api/amonestados'
		//,url: 'https://api.myjson.com/bins/tnlgr'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'amonestados'
	}
	 }
});
