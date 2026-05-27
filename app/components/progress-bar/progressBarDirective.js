angular.module('atividadeApp').directive('progressBar', function () {
  return {
    restrict: 'E',
    scope: {
      value: '='
    },
    templateUrl: 'app/components/progress-bar/progressBarTemplate.html',
    link: function (scope) {
      // Clamp the progress value and map it to the expected color range.
      scope.clampValue = function () {
        if (scope.value < 0) {
          scope.value = 0;
        }

        if (scope.value > 100) {
          scope.value = 100;
        }
      };

      scope.changeValue = function (amount) {
        scope.value += amount;
        scope.clampValue();
      };

      scope.onValueChange = function () {
        scope.clampValue();
      };

      scope.getFillClass = function () {
        if (scope.value <= 33) {
          return 'is-low';
        }

        if (scope.value <= 66) {
          return 'is-medium';
        }

        return 'is-high';
      };
    }
  };
});
