Ext.define('Plani.store.PartidosFecha', {
	 extend: 'Ext.data.Store'
	,storeId: 'PartidosFecha'
	,alias: 'store.PartidosFecha'
	//,autoLoad: true
	//,model:'Plani.model.PartidosFechas'
	,fields: [
	{name: 'equipo1'}
	,{name: 'equipo2'}
	,{name: 'vs' ,defaultValue:'VS'}
	,{name: 'imagen1'}
	,{name: 'imagen2'}

]
	,proxy: {
		 type: 'ajax'
		 ,url: 'http://127.0.0.1:8080/partidosfecha'
		//,url: 'https://api.myjson.com/bins/6skon'
		,paramsAsJson:true
		,actionMethods : {
        create  : 'POST',
        read    : 'POST',
        update  : 'PUT',
        destroy : 'DELETE'
    }
	 	,reader: {
	 		type: 'json',
			rootProperty: 'data'
		}
	 }
});
