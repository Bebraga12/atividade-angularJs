angular.module('atividadeApp').directive('pagination', function () {
  return {
    restrict: 'E',
    scope: {
      currentPage: '=',
      totalPages: '=',
      onChange: '&'
    },
    templateUrl: 'app/components/pagination/paginationTemplate.html',
    link: function (scope) {
      scope.pages = [];

      scope.buildPages = function () {
        var total = scope.totalPages || 1;
        var current = scope.currentPage || 1;
        var start = 1;
        var end = total;

        if (total > 5) {
          if (current <= 3) {
            start = 1;
            end = 5;
          } else if (current >= total - 2) {
            start = total - 4;
            end = total;
          } else {
            start = current - 2;
            end = current + 2;
          }
        }

        scope.pages = [];

        for (var i = start; i <= end; i++) {
          scope.pages.push(i);
        }
      };

      scope.changePage = function (page) {
        if (page < 1 || page > scope.totalPages || page === scope.currentPage) {
          return;
        }

        scope.currentPage = page;
        scope.onChange({ page: page });
        scope.buildPages();
      };

      scope.$watchGroup(['currentPage', 'totalPages'], function () {
        scope.buildPages();
      });
    }
  };
});
