Ext.define('Plani.model.JugadoresEquipo', { //entidad
	 extend: 'Ext.data.Model'
		,fields: [
		{name: 'jugador_id'}
		,{name: 'text'}
		,{name: 'jugador_nombre'}
		,{name: 'jugador_apellido'}
		,{name: 'cant_tarjetas'}
		,{name: 'cant_goles'}
	]
	//,identifier: 'sequential'
});
