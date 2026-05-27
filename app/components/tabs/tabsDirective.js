angular.module('atividadeApp').directive('tabs', function ($sce, $timeout) {
  return {
    restrict: 'E',
    scope: {
      tabs: '='
    },
    templateUrl: 'app/components/tabs/tabsTemplate.html',
    link: function (scope, element) {
      scope.activeIndex = 0;

      scope.prepareTabs = function () {
        // Trust the HTML snippets before rendering them with ng-bind-html.
        angular.forEach(scope.tabs, function (tab) {
          tab.safeContent = $sce.trustAsHtml(tab.content);
        });
      };

      scope.setActive = function (index) {
        scope.activeIndex = index;
      };

      scope.isActive = function (index) {
        return scope.activeIndex === index;
      };

      function bindPreferenceToggle() {
        var panel = element[0].querySelector('.tabs-panel');

        if (!panel) {
          return;
        }

        var checkbox = panel.querySelector('[data-notifications-toggle]');
        var status = panel.querySelector('[data-notifications-status]');

        if (!checkbox || !status || checkbox._boundToStatus) {
          return;
        }

        checkbox._boundToStatus = true;

        checkbox.addEventListener('change', function () {
          status.textContent = checkbox.checked ? 'Status: notifications enabled' : 'Status: notifications paused';
        });
      }

      scope.$watch('tabs', function (value) {
        if (value && value.length) {
          scope.prepareTabs();
          $timeout(bindPreferenceToggle);
        }
      }, true);

      scope.$watch('activeIndex', function () {
        $timeout(bindPreferenceToggle);
      });
    }
  };
});
