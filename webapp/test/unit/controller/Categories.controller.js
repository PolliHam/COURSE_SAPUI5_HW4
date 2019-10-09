/*global QUnit*/

sap.ui.define([
	"ZSHN/COURSE_SAPUI5_HW4/controller/Categories.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Categories Controller");

	QUnit.test("I should test the Categories controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});