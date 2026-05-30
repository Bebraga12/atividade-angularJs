// Diretiva de dropdown customizado com fechamento ao clicar fora e limpeza de listener no $destroy.
// Uso: <dropdown options="dropdownOptions" on-select="filterMenu(option)" placeholder="filtrar por"></dropdown>
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

      // Abre/fecha o painel; stopPropagation impede que o handler global feche imediatamente.
      scope.toggleDropdown = function ($event) {
        if ($event) { $event.stopPropagation(); }
        scope.isOpen = !scope.isOpen;
      };

      // Registra a opção escolhida, fecha o painel e notifica o controller pai.
      scope.selectOption = function (option) {
        scope.selectedOption = option;
        scope.isOpen = false;
        scope.onSelect({ option: option });
      };

      // Fecha o dropdown ao clicar fora da diretiva; $applyAsync evita conflito de digest.
      var handler = function (event) {
        if (!element[0].contains(event.target)) {
          scope.$applyAsync(function () { scope.isOpen = false; });
        }
      };

      $document.on('click', handler);

      // Remove o listener global ao destruir a diretiva para evitar memory leak.
      scope.$on('$destroy', function () {
        $document.off('click', handler);
      });
    }
  };
});
