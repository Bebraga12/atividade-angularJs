// Diretiva de accordion: exibe perguntas/respostas colapsáveis — apenas um painel aberto por vez.
// Uso: <accordion items="faqItems"></accordion>
angular.module('atividadeApp').directive('accordion', function () {
  return {
    restrict: 'E',       // Usado apenas como elemento HTML (<accordion>)
    scope: {
      items: '='         // Array de { title, content } via two-way binding
    },
    templateUrl: 'app/components/accordion/accordionTemplate.html',
    link: function (scope) {

      scope.openIndex = 0; // Índice do painel aberto; -1 = todos fechados.

      // Alterna o painel: se já está aberto fecha (openIndex = -1), senão abre o novo.
      scope.toggleItem = function (index) {
        scope.openIndex = scope.openIndex === index ? -1 : index;
      };

      // Retorna true se o painel do índice dado está aberto — usado no ng-class do template.
      scope.isOpen = function (index) {
        return scope.openIndex === index;
      };
    }
  };
});
