/**
 * DIRETIVA ACCORDION — AngularJS
 *
 * Diretivas estendem o HTML com novos elementos ou atributos reutilizáveis.
 * Esta diretiva cria o elemento <accordion> que exibe perguntas/respostas colapsáveis.
 *
 * Uso no HTML:
 *   <accordion items="faqItems"></accordion>
 *
 * Escopo isolado (scope: {}):
 *   Impede que a diretiva acesse ou polua o escopo do controller pai.
 *   Toda comunicação com o mundo externo passa pelos bindings declarados em scope:{}.
 *
 * Binding '=' (two-way):
 *   items: '='  →  a diretiva lê E pode escrever no array do controller pai.
 *   Mudanças em qualquer lado são refletidas no outro automaticamente.
 *
 * templateUrl: aponta para o arquivo HTML que define a estrutura visual da diretiva.
 *
 * link(scope, element, attrs):
 *   Função executada após o template ser compilado e linkado ao DOM.
 *   É aqui que ficam as manipulações de estado e eventos da diretiva.
 */
angular.module('atividadeApp').directive('accordion', function () {
  return {
    restrict: 'E',       // 'E' = Element: usada APENAS como elemento HTML (<accordion>)
    scope: {
      items: '='         // Recebe o array de { title, content } do controller via two-way binding
    },
    templateUrl: 'app/components/accordion/accordionTemplate.html',
    link: function (scope) {

      // Índice do painel atualmente aberto.
      // 0 = primeiro item aberto por padrão; -1 = todos fechados.
      scope.openIndex = 0;

      /**
       * toggleItem(index) — alterna o estado aberto/fechado de um painel.
       * Comportamento "exclusivo": apenas um painel fica aberto por vez.
       * Se clicar no mesmo painel aberto → fecha (openIndex = -1).
       * Se clicar em outro painel → abre esse e fecha o anterior.
       */
      scope.toggleItem = function (index) {
        scope.openIndex = scope.openIndex === index ? -1 : index;
      };

      /**
       * isOpen(index) — retorna true se o painel informado está aberto.
       * Usado no template com ng-class para aplicar a classe CSS de "aberto".
       */
      scope.isOpen = function (index) {
        return scope.openIndex === index;
      };
    }
  };
});
