angular.module('atividadeApp').directive('toast', function (toastService) {
  return {
    restrict: 'E',
    templateUrl: 'app/components/toast/toastTemplate.html',
    link: function (scope) {
      scope.toast = toastService;

      scope.close = function () {
        toastService.hide();
      };
    }
  };
});
