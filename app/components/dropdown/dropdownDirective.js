/**
 * DIRETIVA DROPDOWN — AngularJS
 *
 * Dropdown customizado com escopo isolado, fechamento ao clicar fora e limpeza de memória.
 *
 * Uso no HTML:
 *   <dropdown options="dropdownOptions"
 *             on-select="filterMenu(option)"
 *             placeholder="filtrar por">
 *   </dropdown>
 *
 * Tipos de binding no escopo isolado:
 *   '='  (two-way)    — options:     lê e sincroniza o array de opções com o controller pai.
 *   '&'  (expression) — on-select:   executa uma expressão/função do controller pai.
 *                       O objeto { option: option } mapeia o parâmetro local ao parâmetro
 *                       esperado pelo callback (filterMenu(option)).
 *   '@'  (one-way string) — placeholder: lê o atributo como string estática do HTML.
 *                           Não sincroniza de volta; ideal para textos de configuração.
 *
 * $document (injetado): wrapper Angular do document global.
 * Usar $document em vez de document nativo facilita testes unitários com mocks.
 */
angular.module('atividadeApp').directive('dropdown', function ($document) {
  return {
    restrict: 'E',
    scope: {
      options:     '=',   // Array de { label, value } vindo do controller
      onSelect:    '&',   // Callback executado ao escolher uma opção
      placeholder: '@'    // Texto inicial do botão enquanto nada está selecionado
    },
    templateUrl: 'app/components/dropdown/dropdownTemplate.html',
    link: function (scope, element) {

      scope.isOpen         = false;  // true = painel de opções visível
      scope.selectedOption = null;   // Objeto { label, value } da opção atual

      /**
       * toggleDropdown($event) — abre ou fecha o painel de opções.
       * stopPropagation() impede que o clique se propague até o handler global no $document,
       * o que fecharia o dropdown imediatamente após abrí-lo.
       */
      scope.toggleDropdown = function ($event) {
        if ($event) {
          $event.stopPropagation();
        }

        scope.isOpen = !scope.isOpen;
      };

      /**
       * selectOption(option) — registra a escolha, fecha o painel e notifica o pai.
       * onSelect({ option: option }) invoca o callback declarado no atributo on-select,
       * passando o objeto selecionado como argumento nomeado.
       */
      scope.selectOption = function (option) {
        scope.selectedOption = option;
        scope.isOpen = false;
        scope.onSelect({ option: option });
      };

      /**
       * Handler de clique global — fecha o dropdown quando o usuário clica FORA da diretiva.
       * element[0] acessa o nó DOM nativo; contains() verifica se o clique foi interno.
       * $applyAsync() agenda a mudança no próximo ciclo de digest, evitando erros de
       * "$apply already in progress" que ocorrem quando o evento vem de fora do Angular.
       */
      var handler = function (event) {
        if (!element[0].contains(event.target)) {
          scope.$applyAsync(function () {
            scope.isOpen = false;
          });
        }
      };

      // Registra o listener no documento inteiro para capturar cliques externos.
      $document.on('click', handler);

      /**
       * $on('$destroy') — limpeza de recursos quando a diretiva é removida do DOM.
       * Sem isso, o handler continuaria ativo mesmo após a diretiva ser destruída,
       * causando memory leak e erros de referência a escopos já coletados pelo GC.
       */
      scope.$on('$destroy', function () {
        $document.off('click', handler);
      });
    }
  };
});
