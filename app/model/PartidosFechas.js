Ext.define('Plani.model.PartidosFechas', { //entidad
	 extend: 'Ext.data.Model'


		,fields: [

		{name: 'equipo1'}
		,{name: 'equipo2'}
		,{name: 'equipo1_id'}
		,{name: 'equipo2_id'}
		,{name: 'imagen1'}
		,{name: 'imagen2'}
		,{name: 'fecha_descri'}
		,{name: 'fecha_id'}
		,{name: 'fixture_id'}
		,{name: 'vs', defaultValue:'VS'}

]
	//,identifier: 'sequential'
});
