define("common/404", ["jquery", "css!common/404/404.css"], function ($) {
	return avalon.controller(function ($ctrl) {
		$ctrl.$onEnter = function (param, rs, rj) {
			document.title = '404'
		}
		$ctrl.$onRendered = function () {}
	})
})