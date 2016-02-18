/*jslint browser: true*/
/*jslint node: true*/
/*jshint strict: false*/
/*global $, jQuery, alert*/
'use strict';
var myApp = myApp || {};//for futures apps we give it a namespace so can be used in others libraries
// I used Revealing Prototype Pattern. Is not the best way to do this exercise but I wanna it to try


myApp.TwitchUser = function () {
	this.name = "Twitch";

};


$(document).ready(function () {

	myApp.TwitchUser.prototype = (function () {
		var channels = ["freecodecamp", "storbeck", "terakilobyte", "Motroco_87",
						  "imaqtpie", "thomasballinger", "noobs2ninjas",
						  "sdkjfhaskfhd", "brunofin", "comster404", "puhdado", "flusha", "shroud"],
			loremLogo = "http://lorempixel.com/50/50/",

		    getData = function () {


				channels.forEach(function (channel) {//iterate over channels getting the url , after that draws the result to the html page.

					function getUrl(prop, chan) {//every url from de channels

						var url = "https://api.twitch.tv/kraken/" + prop + "/" + chan + "?callback=?";
						return url;

					}//end getUrl

					$.ajax({
						type: "GET",
						dataType: "json",
						url: getUrl("streams", channel),
						crossDomain: true,
                        success: function (js1) {
							var logo,
								message,
								name;

							$.ajax({
								type: "GET",
								dataType: "json",
								url: getUrl("channels", channel),
								crossDomain: true,
								success: function (js2) {

									if (js1.stream === null) {
										message = "This channel is offline";
										logo = js2.logo !== null ?  js2.logo : loremLogo;
										name = js2.display_name;

										$("#user").append("<img class='logo' src=" + logo + ">");
										$("#user").append("<div class='name' >" + name + "</div>");
										$("#user").append("<div class='message' >" + message + "</div>");

									} else if (js1.stream === undefined) { //if undefined means
										logo = loremLogo;
										message = js1.message;
										$("#user").append("<img class='logo' src=" + logo + ">");
										$("#user").append("<div class='message' >" + message + " or account closed</div>");

									} else if (js1.stream !== null) {
										name = js1.stream.channel.display_name;
										logo = js1.stream.channel.logo;
										message = js1.stream.game;
										$("#user").append("<img class='logo' src=" + logo + ">");
										$("#user").append("<div class='name' >  " + name + "</div>");
										$("#user").append("<div class='message' > Playing " + message + "</div>");
									}// end if
								}// end success js2
							});//end ajax2
						}//end success js1
					});//end ajax1
				});//end forEach
			};//end getData

		return {//public methods

		    getData : getData

		};

	}());
	var user = new myApp.TwitchUser();
	user.getData();


	//console.log(user.channels);

});
