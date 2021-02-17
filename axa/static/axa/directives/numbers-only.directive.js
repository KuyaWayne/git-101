(function(angular) {
  'use strict';
  angular
    .module('axa')
    .directive('numbersOnly', numbersOnly);

  function numbersOnly() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(attrs.ngModel, function(inputValue) {
          var transformedInput = 0;
          if (inputValue) {
            inputValue = inputValue.toString();
            if (!angular.isDefined(inputValue)) {
              inputValue = '';
            }
            transformedInput = inputValue.replace(/[^0-9]/g, '');
            if (transformedInput != inputValue) {
              ctrl.$setViewValue(transformedInput);
              ctrl.$render();
            }
          }
          return transformedInput;
        });
      }
    };
  }
})(angular);
