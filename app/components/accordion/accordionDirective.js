angular.module('atividadeApp').directive('accordion', function () {
  return {
    restrict: 'E',
    scope: {
      items: '='
    },
    templateUrl: 'app/components/accordion/accordionTemplate.html',
    link: function (scope) {
      scope.openIndex = 0;

      scope.toggleItem = function (index) {
        scope.openIndex = scope.openIndex === index ? -1 : index;
      };

      scope.isOpen = function (index) {
        return scope.openIndex === index;
      };
    }
  };
});
