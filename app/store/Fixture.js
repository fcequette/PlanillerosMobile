Ext.define('Plani.store.Fixture', {
	 extend: 'Ext.data.Store'
	,storeId: 'Fixture'
	,alias: 'store.fixture'
	,autoLoad: true
	// ,groupField: 'fecha'
	,model:'Plani.model.Fixtures'
	// ,alias: 'store.fixture'
	,fields: [
	{name: 'equipo1'}
	,{name: 'equipo2'}
	,{name: 'vs' ,defaultValue:'VS'}
	,{name: 'imagen1'}
	,{name: 'imagen2'}

]
	,proxy: {
		 type: 'ajax'
		,url: 'http://dario-casa.sytes.net/api/fixture?_dc=1516139380847&torneo_id=1&categoria_id=1&zona_id=1&page=1&start=0&limit=25'
		,method: 'GET'
	 	,reader: {
	 			type: 'json',
				//rootProperty: 'data'
				rootProperty: 'fixture'
		}
	}
});
