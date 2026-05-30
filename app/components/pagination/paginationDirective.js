// Diretiva de paginação com janela deslizante de até 5 botões visíveis.
// Uso: <pagination current-page="currentPage" total-pages="totalPages" on-change="goToPage(page)"></pagination>
angular.module('atividadeApp').directive('pagination', function () {
  return {
    restrict: 'E',
    scope: {
      currentPage: '=',   // Página ativa — lida e escrita pela diretiva
      totalPages:  '=',   // Total calculado pelo controller após filtros
      onChange:    '&'    // Callback para sincronizar o controller ao mudar de página
    },
    templateUrl: 'app/components/pagination/paginationTemplate.html',
    link: function (scope) {

      scope.pages = []; // Números a renderizar como botões no template.

      // Calcula quais páginas exibir (máx. 5): ancora no início, no fim ou centraliza na página atual.
      scope.buildPages = function () {
        var total   = scope.totalPages  || 1;
        var current = scope.currentPage || 1;
        var start   = 1;
        var end     = total;

        if (total > 5) {
          if (current <= 3) {
            start = 1; end = 5;                      // Ancora no início
          } else if (current >= total - 2) {
            start = total - 4; end = total;           // Ancora no fim
          } else {
            start = current - 2; end = current + 2;  // Centraliza na página atual
          }
        }

        scope.pages = [];
        for (var i = start; i <= end; i++) { scope.pages.push(i); }
      };

      // Navega para a página solicitada e notifica o controller; ignora cliques inválidos.
      scope.changePage = function (page) {
        if (page < 1 || page > scope.totalPages || page === scope.currentPage) { return; }
        scope.currentPage = page;
        scope.onChange({ page: page });
        scope.buildPages();
      };

      // Reconstrói os botões ao navegar ou ao aplicar filtros que alteram totalPages.
      scope.$watchGroup(['currentPage', 'totalPages'], function () {
        scope.buildPages();
      });
    }
  };
});
