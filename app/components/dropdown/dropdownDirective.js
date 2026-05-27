angular.module('atividadeApp').directive('dropdown', function ($document) {
  return {
    restrict: 'E',
    scope: {
      options: '=',
      onSelect: '&',
      placeholder: '@'
    },
    templateUrl: 'app/components/dropdown/dropdownTemplate.html',
    link: function (scope, element) {
      scope.isOpen = false;
      scope.selectedOption = null;

      scope.toggleDropdown = function ($event) {
        if ($event) {
          $event.stopPropagation();
        }

        scope.isOpen = !scope.isOpen;
      };

      scope.selectOption = function (option) {
        scope.selectedOption = option;
        scope.isOpen = false;
        scope.onSelect({ option: option });
      };

      // Close the menu when the user clicks anywhere outside the component.
      var handler = function (event) {
        if (!element[0].contains(event.target)) {
          scope.$applyAsync(function () {
            scope.isOpen = false;
          });
        }
      };

      $document.on('click', handler);

      scope.$on('$destroy', function () {
        $document.off('click', handler);
      });
    }
  };
});
