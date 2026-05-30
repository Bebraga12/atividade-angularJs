// Diretiva de barra de progresso com clamp automático e cor dinâmica.
// Uso: <progress-bar value="progress"></progress-bar>
// value: número entre 0 e 100 (two-way binding com o controller)
angular.module('atividadeApp').directive('progressBar', function () {
  return {
    restrict: 'E',
    scope: {
      value: '='    // Two-way: lê e grava o valor no controller pai
    },
    templateUrl: 'app/components/progress-bar/progressBarTemplate.html',
    link: function (scope) {

      // Garante que o valor nunca ultrapasse os limites 0–100,
      // seja por input manual ou por chamadas externas ao controller.
      scope.clampValue = function () {
        if (scope.value < 0)   { scope.value = 0;   }
        if (scope.value > 100) { scope.value = 100; }
      };

      // Incrementa ou decrementa o valor e aplica o clamp em seguida.
      scope.changeValue = function (amount) {
        scope.value += amount;
        scope.clampValue();
      };

      // Chamado pelo ng-change do input range para manter o valor dentro dos limites.
      scope.onValueChange = function () {
        scope.clampValue();
      };

      // Retorna a classe CSS de cor conforme o progresso atual:
      //   0–33  → is-low    (vermelho)
      //   34–66 → is-medium (amarelo)
      //   67–100 → is-high  (verde)
      scope.getFillClass = function () {
        if (scope.value <= 33) { return 'is-low';    }
        if (scope.value <= 66) { return 'is-medium'; }
        return 'is-high';
      };
    }
  };
});
