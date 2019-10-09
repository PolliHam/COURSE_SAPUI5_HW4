sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("ZSHN.COURSE_SAPUI5_HW4.controller.ProductDetails", {

		onInit: function () {
			
			var iOriginalBusyDelay,
				oViewModel = new JSONModel({
					busy : true,
					delay : 0
				});

			this.getRouter().getRoute("ProductDetails").attachPatternMatched(this._onRouteMatched, this);

			iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
			this.setModel(oViewModel, "objectView");
		},
		
		_onRouteMatched: function (oEvent) {
			var view = this;
			var oArgs = oEvent.getParameter("arguments");
			var url = "https://cors-anywhere.herokuapp.com/https://services.odata.org/V2/OData/OData.svc";
			var oModelData = new sap.ui.model.odata.v2.ODataModel(url, true);
			oModelData.read("/Products(" + oArgs.objectId+ ")", {
				method: "GET",
				success: function (data) {
					var oJSONModel = new JSONModel(data);
					view.setModel(oJSONModel, "products");
				}
			});
			oModelData.read("/Products(" + oArgs.objectId+ ")/Category", {
				method: "GET",
				success: function (data) {
					var oJSONModel = new JSONModel(data);
					view.setModel(oJSONModel, "category");
				}
			});
			oModelData.read("/Products(" + oArgs.objectId+ ")/Supplier", {
				method: "GET",
				success: function (data) {
					var oJSONModel = new JSONModel(data);
					view.setModel(oJSONModel, "supplier");
				}
			});
			oModelData.read("/Products(" + oArgs.objectId+ ")/Supplier/Address", {
				method: "GET",
				success: function (data) {
					var oJSONModel = new JSONModel(data);
					view.setModel(oJSONModel, "supplierAdr");
				}
			});
		}
});

});