Ext.define('Plani.model.Amonestado', { //entidad
	 extend: 'Ext.data.Model'
		,fields: [
		{name: 'jugador_id'}
		,{name: 'text'}
		,{name: 'jugador_nombre'}
		,{name: 'cant_tarjetas'}
	]
	//,identifier: 'sequential'
});
