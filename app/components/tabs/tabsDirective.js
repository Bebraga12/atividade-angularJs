// Diretiva de abas (tabs) com suporte a conteúdo HTML dinâmico.
// Uso: <tabs tabs="profileTabs"></tabs>
// tabs: array de { label, content } onde content é uma string HTML — vem do dataService.
angular.module('atividadeApp').directive('tabs', function ($sce, $timeout) {
  return {
    restrict: 'E',
    scope: {
      tabs: '='     // Two-way: array de abas com label e conteúdo HTML
    },
    templateUrl: 'app/components/tabs/tabsTemplate.html',
    link: function (scope, element) {

      scope.activeIndex = 0;  // Índice da aba atualmente visível

      // Sanitiza o HTML de cada aba com $sce.trustAsHtml para que ng-bind-html
      // possa renderizá-lo com segurança (o Angular bloqueia HTML não confiável por padrão).
      scope.prepareTabs = function () {
        angular.forEach(scope.tabs, function (tab) {
          tab.safeContent = $sce.trustAsHtml(tab.content);
        });
      };

      // Torna a aba do índice fornecido a ativa.
      scope.setActive = function (index) {
        scope.activeIndex = index;
      };

      // Utilitário para aplicar a classe CSS de ativa no template.
      scope.isActive = function (index) {
        return scope.activeIndex === index;
      };

      // Vincula o checkbox de "notificações" ao parágrafo de status dentro do painel de preferências.
      // É feito via DOM direto porque o conteúdo da aba é HTML injetado dinamicamente,
      // fora do ciclo de binding normal do Angular.
      function bindPreferenceToggle() {
        var panel    = element[0].querySelector('.tabs-panel');
        if (!panel) { return; }

        var checkbox = panel.querySelector('[data-notifications-toggle]');
        var status   = panel.querySelector('[data-notifications-status]');

        // _boundToStatus evita registrar o mesmo listener múltiplas vezes ao trocar de aba.
        if (!checkbox || !status || checkbox._boundToStatus) { return; }

        checkbox._boundToStatus = true;

        checkbox.addEventListener('change', function () {
          status.textContent = checkbox.checked
            ? 'Status: notificações ativadas'
            : 'Status: notificações pausadas';
        });
      }

      // Roda prepareTabs e ativa o toggle sempre que o array de abas mudar.
      // $timeout adia a execução para após o Angular terminar de renderizar o DOM.
      scope.$watch('tabs', function (value) {
        if (value && value.length) {
          scope.prepareTabs();
          $timeout(bindPreferenceToggle);
        }
      }, true);

      // Re-vincula o toggle toda vez que o usuário troca de aba.
      scope.$watch('activeIndex', function () {
        $timeout(bindPreferenceToggle);
      });
    }
  };
});
