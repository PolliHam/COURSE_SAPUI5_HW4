sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/m/library"
], function (Controller, UIComponent, mobileLibrary) {
	"use strict";


	return Controller.extend("ZSHN.COURSE_SAPUI5_HW4.controller.BaseController", {

		getRouter : function () {
			return UIComponent.getRouterFor(this);
		},

		
		getModel : function (sName) {
			return this.getView().getModel(sName);
		},

		
		setModel : function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

	
		getResourceBundle : function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		}	
		
	});
});