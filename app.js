/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
 var second = false;
Ext.application({
    name: 'Plani',

    extend: 'Plani.Application',

    requires: [
        'Plani.view.main.Main'
    ],

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    mainView: 'Plani.view.main.Main',



    //-------------------------------------------------------------------------
    // Most customizations should be made to Plani.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
Ext.Ajax._defaultHeaders = {
	 'Content-Type': 'application/json'
	,'Authorization': 'Bearer '+localStorage.getItem('EPW-AccessToken')
	//,'UserId':localStorage.getItem('CompanyActive')
};

Ext.override(Ext, {
  cq1: function(selector) {
    return Ext.ComponentQuery.query(selector)[0];
  }
});
// Ext.define('Plani.override.form.action.Submit',{
// 	override: 'Ext.form.action.Submit',
// 	doSubmit: function () {
//     console.log('entra');
// 	var me = this,
// 		ajaxOptions = Ext.apply(me.createCallback(), {
// 			url: me.getUrl(),
// 			method: me.getMethod(),
// 			headers: me.headers
// 		}),
// 		form = me.form
// 		,nform = me.form.owner.config.xtype
// 		,xform =Ext.cq1(nform)
// 		,jsonSubmit = me.jsonSubmit || form.jsonSubmit
// 		,paramsProp = jsonSubmit ? 'jsonData' : 'params'
// 		,formInfo;
//
// 	// For uploads we need to create an actual form that contains the file upload fields,
// 	// and pass that to the ajax call so it can do its iframe-based submit method.
// 		if (form.hasUpload()) {
// 			formInfo = me.buildForm();
// 			ajaxOptions.form = formInfo.formEl;
// 			ajaxOptions.isUpload = true;
// 		} else {
// 			ajaxOptions[paramsProp] = me.getParams(jsonSubmit);
// 		}
// 		var arr2 =[];
// 		arr2 = xform.query('grid');
// 			if (!Ext.isEmpty(arr2)) {
// 				var dataRecords= [];
// 				arr2.forEach(function(grid) {
// 					if (grid.isSubmit) {
// 						if (grid.submitConfig[0].type === 'Selected') { // si ña grilla tiene definido q carga un solo record
// 							var record = grid.getView().getSelectionModel().getSelection();
// 							var record2= new Object();
// 							grid.submitConfig[0].fields.forEach(function(field) {
// 	 							if (Ext.isDefined(record[0].data[field])) {
// 	 								record2[field] =record[0].data[field]
// 								}
// 							});
// 							dataRecords.push(record2);
// 						} else  if(grid.submitConfig[0].type === 'All') { // carga todo los record
// 							//var record= [];
// 							grid.getStore().each(function( rec ) {
// 								//var record= Ext.data.Record.create();
// 								var record = new Object();
// 								grid.submitConfig[0].fields.forEach(function(field) {
// 									if (Ext.isDefined(rec.data[field])){
// 										record[field] =rec.data[field]
// 									}
// 								});
// 								dataRecords.push(record);
// 							});
// 						}
// 						var ngrid = grid.name;
// 					//ajaxOptions.params[ngrid]= "'"+Ext.encode(dataRecords)+"'";
// 					if (Ext.isDefined(ajaxOptions.params)){
// 						ajaxOptions.params[ngrid]= Ext.encode(dataRecords);
// 					} else {
// 						ajaxOptions.jsonData[ngrid] = Ext.encode(dataRecords);
// 					}
// 						dataRecords = [];
// 					}
// 			});
// 		}
// 		//ajaxOptions.params.codemp = localStorage.getItem('CompanyActive');
// 		console.log('*AjaxOptions*', ajaxOptions);
//  		Ext.Ajax.request(ajaxOptions);
// 		if (formInfo) {
//  			me.cleanup(formInfo);
// 		}
// 	}
// });
