sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, JSONModel, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("ZSHN.COURSE_SAPUI5_HW4.controller.Categories", {
		onInit: function () {
			var oViewModel,
				iOriginalBusyDelay,
				oTable = this.byId("table");
			
			iOriginalBusyDelay = oTable.getBusyIndicatorDelay();
			this._aTableSearchState = [];

			// Model used to manipulate control states
			oViewModel = new JSONModel({
				worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
				tableNoDataText: this.getResourceBundle().getText("tableNoDataText"),
				tableBusyDelay: 0
			});
			this.setModel(oViewModel, "worklistView");

			oTable.attachEventOnce("updateFinished", function () {
				oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
			});

			
			var url = "https://cors-anywhere.herokuapp.com/https://services.odata.org/V2/OData/OData.svc";
			var oModelData = new sap.ui.model.odata.v2.ODataModel(url, true);
			oTable.setModel(oModelData);
		},
		
		onUpdateFinished: function (oEvent) {
			// update the worklist's object counter after the table update
			var sTitle,
				oTable = oEvent.getSource(),
				iTotalItems = oEvent.getParameter("total");
			// only update the counter if the length is final and
			// the table is not empty
			if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
				sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
			} else {
				sTitle = this.getResourceBundle().getText("worklistTableTitle");
			}
			this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);
		},

		onPress: function (oEvent) {
			// The source is the list item that got pressed
			this.getRouter().navTo("Products", {
				objectId: oEvent.getSource().getBindingContext().getProperty("ID")
			});
		},

		onSearch: function (oEvent) {
			if (oEvent.getParameters().refreshButtonPressed) {
				// Search field's 'refresh' button has been pressed.
				// This is visible if you select any master list item.
				// In this case no new search is triggered, we only
				// refresh the list binding.
				this.onRefresh();
			} else {
				var aTableSearchState = [];
				var sQuery = oEvent.getParameter("query");

				if (sQuery && sQuery.length > 0) {
					aTableSearchState = [new Filter("Name", FilterOperator.Contains, sQuery)];
				}
				this._applySearch(aTableSearchState);
			}

		},

		onRefresh: function () {
			var oTable = this.byId("table");
			oTable.getBinding("items").refresh();
		},

		_applySearch: function (aTableSearchState) {
			var oTable = this.byId("table"),
				oViewModel = this.getModel("worklistView");
			oTable.getBinding("items").filter(aTableSearchState, "Application");
			// changes the noDataText of the list in case there are no filter results
			if (aTableSearchState.length !== 0) {
				oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
			}
		}
	});
});