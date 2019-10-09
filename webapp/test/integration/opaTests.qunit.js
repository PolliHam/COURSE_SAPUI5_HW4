/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ZSHN/COURSE_SAPUI5_HW4/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});