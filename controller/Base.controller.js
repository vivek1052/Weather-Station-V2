sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ZWS.ZWeatherStation.controller.Base", {
		onInit: function () {
			var urlObserve = "https://api.aerisapi.com/observations/:auto?";
			var urlForecast = "https://api.aerisapi.com/forecasts/:auto?";
			var clientId = "QYdrWBhiePW5v7O0W7PAa";
			var clientSecret = "qZ88pijM3CZeM9cvH4EOAzoy7OT7dqH6nX1esUk9";
			var jsonModelObserve = new sap.ui.model.json.JSONModel();
			var jsonModelForecast = new sap.ui.model.json.JSONModel();
			jsonModelObserve.loadData(urlObserve, {
				filter: "allstations",
				limit: "1",
				fields: "place,ob.dateTimeISO,ob.tempC,ob.humidity,ob.windSpeedKPH,ob.pressureIN,ob.weather,ob.feelslikeC,ob.icon",
				client_id: clientId,
				client_secret: clientSecret
			});
			jsonModelForecast.loadData(urlForecast, {
				filter: "day",
				limit: "14",
				fields: "periods.dateTimeISO,periods.maxTempC,periods.minTempC,periods.avgTempC,periods.maxHumidity,periods.minHumidity,periods.humidity,periods.weather,periods.icon",
				client_id: clientId,
				client_secret: clientSecret
			});
			this.getView().byId("HeaderContainer").setModel(jsonModelObserve);
			this.getView().byId("iconTabBar").setModel(jsonModelForecast);
			this.getView().byId("grid0").setModel(jsonModelForecast);
		},
		dateFormatter: function (date) {
			return (new Date(date).toDateString());
		}

	});
});