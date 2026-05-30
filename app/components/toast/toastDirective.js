// Diretiva de notificação toast — exibe mensagens de feedback ao usuário.
// Uso: <toast></toast>  (geralmente uma única instância no index.html)
// Não possui escopo isolado: acessa o toastService diretamente para ler o estado reativo.
angular.module('atividadeApp').directive('toast', function (toastService) {
  return {
    restrict: 'E',
    templateUrl: 'app/components/toast/toastTemplate.html',
    link: function (scope) {

      // Expõe o serviço ao template para que ng-show e interpolações leiam isVisible, type e message.
      scope.toast = toastService;

      // Permite que o usuário feche o toast manualmente antes do timer de 4s expirar.
      scope.close = function () {
        toastService.hide();
      };
    }
  };
});
