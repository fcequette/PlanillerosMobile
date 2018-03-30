
Ext.define('Plani.store.Torneos', {
	 extend: 'Ext.data.Store'
	,storeId: 'Torneos'
	,autoLoad: true
	,alias: 'store.torneos'
	//,groupField: 'fecha'
	//groupDir  : 'DESC'
	,fields: [
		{name: 'torneo_id'}
	,{name: 'torneo_descri'}
	,{name: 'torneo_estado'}
]
	,proxy: {
		 	type: 'ajax'
		 	,url: 'http://dario-casa.sytes.net/api/torneo'
			,method: 'GET'
	 		,reader: {
	 				type: 'json',
			 		rootProperty: 'torneos'
			}
	 }
});
