/*jslint browser: true*/
/*global $, jQuery, alert*/
var myApp = myApp || {};

$(document).ready(function () {
    //'use strict';


	var TwitchUser = function () {
		this.channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx",
                    "RobotCaleb", "thomasballinger", "noobs2ninjas",
                    "beohoff", "brunofin", "comster404"];
	};

	TwitchUser.prototype = (function () {
		var	url = "",

			getData = function (prop, chan) {
				for (var i = 0 ; i < this.channels.length; i++){
					url = "https://api.twitch.tv/kraken/" + prop + "/" +          chan + "?callback=?";
						return url;
				}
			},

			getFile = function () {
				$.getJSON(getData("streams", channel), function(dt){


				})
		    };

	}());


});
