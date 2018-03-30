Ext.define('Plani.model.Fixtures', { //entidad
	 extend: 'Ext.data.Model'


		,fields: [
				{name: 'equipo1'}
				,{name: 'equipo2'}
				,{name: 'vs' ,defaultValue:'VS'}
				,{name: 'imagen1'}
				,{name: 'imagen2'}
				,{name: 'turno_id'}
				,{name: 'cancha_id'}
				,{name: 'turno_descri'}
				,{name: 'cancha_descri'}
		]


	//,identifier: 'sequential'
});
