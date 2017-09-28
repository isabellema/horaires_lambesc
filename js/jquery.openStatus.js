/*
 * Open Status jQuery plugin version 1.0
 * Chris Cook - chris@chris-cook.co.uk
 */

function findGetParameter(parameterName) {
    var result = null,
	tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
	tmp = items[index].split("=");
	if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

(function ($) {

	'use strict';

	$.fn.openStatus = function (options) {

		var settings = $.extend({
			string1 : '<strong>',
			string2 : '</strong> aujourd\'hui<br /><br /><span class="legend">',
			string3 : '</span>'
			}, options),
			$container = this,
			days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
			daysHours = [settings.sunday, settings.monday, settings.tuesday, settings.wednesday, settings.thursday, settings.friday, settings.saturday],
			todaysDate = new Date(),
			todayDayNumber = todaysDate.getDay(),
		//			todayDayString = days[todayDayNumber],
		openingHoursToday = daysHours[todayDayNumber];
		var openingHoursWeek = "";
		for (var i = 0; i < 7; i++){
		    var dayNum = (i+1)%7;
		    if (daysHours[dayNum].indexOf("ouvert") !== -1)
			openingHoursWeek += days[dayNum] + " : " + daysHours[dayNum] + "<br />";
		}

		//		$container.html(settings.string1 + todayDayString + settings.string2 + openingHoursToday + settings.string3);
		var whenParam = findGetParameter("quand");
		if ((whenParam !== null) && (whenParam !== ""))  {
		    if (whenParam === "demain") {
			settings.string2 = '</strong> demain<br /><br /><span class="legend">';
			openingHoursToday = daysHours[(todayDayNumber+1)%7];
		    } else if (days.indexOf(whenParam) !== null) {
			settings.string2 = '</strong> ' + whenParam + '<br /><br /><span class="legend">';
			openingHoursToday = daysHours[days.indexOf(whenParam)];
		    }
		}
		$container.html(settings.string1 + openingHoursToday + settings.string2 + openingHoursWeek);

		return this;

	};

})(jQuery);
