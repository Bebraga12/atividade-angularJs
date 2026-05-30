/**
 * TOAST SERVICE — AngularJS Factory
 *
 * Gerencia o estado das notificações temporárias (toasts) exibidas na UI.
 *
 * Padrão "service como estado reativo":
 * O service retorna o próprio objeto de estado (state), não uma classe ou função.
 * Qualquer controller ou diretiva que injete toastService recebe a MESMA referência,
 * então uma alteração feita em qualquer lugar é imediatamente visível em todos —
 * sem necessidade de $broadcast, $emit ou watchers externos.
 *
 * $timeout (injetado): versão Angular-aware do setTimeout nativo.
 * Ele dispara o digest cycle automaticamente ao terminar, garantindo que a view
 * atualize sem precisar de $scope.$apply() manual.
 */
angular.module('atividadeApp').factory('toastService', function ($timeout) {

  // Guarda a referência do timer ativo para poder cancelá-lo caso um novo toast
  // seja disparado antes do fechamento automático (evita "piscar" duplo).
  var hidePromise = null;

  // Objeto de estado público: a view faz data binding diretamente nessas propriedades.
  var state = {
    isVisible: false,   // Controla se o componente de toast aparece na tela
    message:   '',      // Texto exibido dentro do toast
    type:      'info'   // Classe CSS do toast: 'info' | 'success' | 'warning' | 'error'
  };

  // Cancela o timer de fechamento anterior (se existir) sem lançar erro.
  // $timeout.cancel() é o par do $timeout() para limpar timers pendentes.
  function cancelTimer() {
    if (hidePromise) {
      $timeout.cancel(hidePromise);
      hidePromise = null;
    }
  }

  /**
   * show(type, message) — exibe o toast e agenda o fechamento automático.
   *
   * Sempre cancela o timer anterior antes de criar um novo,
   * de forma que chamadas rápidas em sequência reiniciem o contador de 4 segundos
   * em vez de fechar prematuramente.
   */
  state.show = function (type, message) {
    cancelTimer();

    state.isVisible = true;
    state.type      = type    || 'info';
    state.message   = message || '';

    // Fecha automaticamente após 4 segundos.
    // A função interna roda dentro do digest cycle graças ao $timeout.
    hidePromise = $timeout(function () {
      state.isVisible = false;
      hidePromise = null;
    }, 4000);
  };

  /**
   * hide() — fecha o toast imediatamente (ex.: botão "X" de fechar).
   * Cancela o timer para não tentar fechar algo que já está fechado.
   */
  state.hide = function () {
    cancelTimer();
    state.isVisible = false;
  };

  // Retorna o próprio state: é a mesma referência compartilhada por todos os consumidores.
  return state;
});
