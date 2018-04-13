Ext.define('Plani.store.Capilla', {
	 extend: 'Ext.data.Store'
	,storeId: 'Capilla'
	//,model:'Torneo.model.Amonestado'
	,proxy: {
		 	type: 'ajax'
		 	,url: 'http://127.0.0.1:8080/encapilla'
			//,url: 'https://api.myjson.com/bins/tnlgr'
			,method: 'GET'
	 		,reader: {
	 			type: 'json',
			 	rootProperty: 'encapilla'
		 }
	 }
});
