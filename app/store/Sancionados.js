Ext.define('Plani.store.Sancionados', {
	 extend: 'Ext.data.Store'
	,storeId: 'Sancionados'
	//,model:'Torneo.model.Amonestado'
	,proxy: {
		 	type: 'ajax'
		 	,url: 'http://127.0.0.1:8080/sancionados'
			//,url: 'https://api.myjson.com/bins/tnlgr'
			,method: 'GET'
	 		,reader: {
	 			type: 'json',
			 	rootProperty: 'sancionados'
		 }
	 }
});
