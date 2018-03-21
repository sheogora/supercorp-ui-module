'use strict';

/**
 * @ngdoc directive
 * @name ui.elements:uiToggle
 *
 * @description
 * Displays a toggle on/off element that renders as a hidden checkbox underneath.
 *
 * @restrict E
 * @element ANY
 *
 * @param {string} dark if present, the rendered element will be applied with a dark styling theme.
 * @param {string} id the identifier of the toggle element.
 * @param {object} ngModel the bound property element for the toggle.
 *
 * @example

 <doc:example>
 <doc:source>
 <ui-toggle dark ng-model="selectedOption" id="toggle2"></ui-toggle>
 </doc:source>
 </doc:example>
 *
 */

// @ngInject
module.exports = function ($timeout) {
	return {
		transclude: true,
		scope: {
			id: '@',
			dark: '@',
			ngval: '=ngModel',
			ngChange: '&'
		},
		require: '?ngModel',
		template: '<span><input ng-transclude type="checkbox" id="toggle-{{id}}" class="ui-toggle" ng-class="getTheme()" ng-model="ngval" ng-change="doNgChange()"/><label for="toggle-{{id}}"></label></span>',
		link: function (scope, element, attrs, ngModel) {
			$timeout(function () {
				scope.ngval = ngModel.$viewValue;
			});

			if (!scope.id) {
				// If no id supplied, create a DOM id so that the associated label can be identified.
				scope.id = Math.floor(Math.random() * Math.floor(100000));
			}
			scope.getTheme = function () {
				return attrs.dark ? 'dark' : 'light';
			};

			scope.doNgChange = function () {
				$timeout(function () {
					scope.ngChange();
				});
			};
		},
		restrict: 'E',
		replace: true
	};
};