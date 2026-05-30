// Factory que gerencia o estado reativo das notificações toast da aplicação.
// $timeout é a versão Angular-aware do setTimeout — dispara o digest cycle ao terminar.
angular.module('atividadeApp').factory('toastService', function ($timeout) {

  var hidePromise = null; // Referência do timer ativo para cancelar antes de criar um novo.

  // Estado público: a view faz data binding diretamente nessas propriedades.
  var state = {
    isVisible: false,   // Controla se o toast aparece na tela
    message:   '',      // Texto exibido dentro do toast
    type:      'info'   // Classe CSS: 'info' | 'success' | 'warning' | 'error'
  };

  // Cancela o timer de fechamento anterior sem lançar erro.
  function cancelTimer() {
    if (hidePromise) {
      $timeout.cancel(hidePromise);
      hidePromise = null;
    }
  }

  // Exibe o toast e agenda fechamento automático após 4 segundos; reinicia o contador se chamado novamente.
  state.show = function (type, message) {
    cancelTimer();
    state.isVisible = true;
    state.type      = type    || 'info';
    state.message   = message || '';
    hidePromise = $timeout(function () {
      state.isVisible = false;
      hidePromise = null;
    }, 4000);
  };

  // Fecha o toast imediatamente, cancelando o timer pendente.
  state.hide = function () {
    cancelTimer();
    state.isVisible = false;
  };

  return state; // Mesma referência compartilhada por todos os consumidores.
});
