Ext.define('Plani.store.Categorias', {
	 extend: 'Ext.data.Store'
	,storeId: 'Categorias'
	,proxy: {
		 type: 'ajax'
		// ,url:'http://localhost;8080/categoria'
	,url: 'http://127.0.0.1:8080/categoria'
	///,url: 'https://api.myjson.com/bins/1deorr'
	//,url:'https://api.myjson.com/bins/l7tqx'
		,method: 'GET'
	 	,reader: {
	 		type: 'json',
			 rootProperty: 'categorias'
		}
	 }
});
