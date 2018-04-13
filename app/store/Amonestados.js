Ext.define('Plani.store.Amonestados', {
	 extend: 'Ext.data.Store'
	,storeId: 'Amonestados'
	//,model:'Torneo.model.Amonestado'
	,proxy: {
		 	type: 'ajax'
		 	,url: 'http://127.0.0.1:8080/amonestados'
			//,url: 'https://api.myjson.com/bins/tnlgr'
			,method: 'GET'
	 		,reader: {
	 			type: 'json',
			 	rootProperty: 'amonestados'
		 }
	 }
});
