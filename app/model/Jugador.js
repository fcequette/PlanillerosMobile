Ext.define('Plani.model.Jugador', { //entidad
	 extend: 'Ext.data.Model'


		,fields: [
		{name: 'jugador_id'}
		,{name: 'text'}
		,{name: 'jugador_nombre'}
		,{name: 'jugador_apellido'}
		,{name: 'jugador_dni'}
		,{name: 'jugador_fechanac'}

	]


	//,identifier: 'sequential'
});
