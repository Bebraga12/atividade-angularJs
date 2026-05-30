/**
 * DIRETIVA PAGINATION — AngularJS
 *
 * Renderiza os controles de paginação com uma janela deslizante de até 5 números.
 * A janela evita sobrecarregar a UI quando há muitas páginas (ex.: 20+).
 *
 * Uso no HTML:
 *   <pagination current-page="currentPage"
 *               total-pages="totalPages"
 *               on-change="goToPage(page)">
 *   </pagination>
 *
 * Bindings:
 *   currentPage '=' — two-way: a diretiva lê a página atual E atualiza quando o usuário navega.
 *   totalPages  '=' — two-way: reflete o total calculado pelo controller após filtros.
 *   onChange    '&' — expression: chama goToPage(page) no controller pai para fatiar os itens.
 *
 * $watchGroup(['currentPage', 'totalPages'], fn):
 *   Observa dois valores ao mesmo tempo; recalcula os botões sempre que qualquer um mudar.
 *   Isso garante que a paginação se atualize tanto ao navegar quanto ao aplicar novos filtros.
 */
angular.module('atividadeApp').directive('pagination', function () {
  return {
    restrict: 'E',
    scope: {
      currentPage: '=',   // Página ativa — lida e escrita pela diretiva
      totalPages:  '=',   // Total de páginas — calculado pelo controller
      onChange:    '&'    // Callback para sincronizar o controller ao mudar de página
    },
    templateUrl: 'app/components/pagination/paginationTemplate.html',
    link: function (scope) {

      // Array de números de página a serem renderizados como botões no template.
      scope.pages = [];

      /**
       * buildPages() — calcula quais números de página exibir (máximo 5 por vez).
       *
       * Algoritmo de janela deslizante:
       *   - Se ≤ 5 páginas no total: mostra todas.
       *   - Início (páginas 1–3): janela fixa nas 5 primeiras.
       *   - Fim (últimas 3 páginas): janela fixa nas 5 últimas.
       *   - Meio: página atual no centro, 2 antes e 2 depois.
       *
       * Isso mantém a UI limpa independentemente do número total de páginas.
       */
      scope.buildPages = function () {
        var total   = scope.totalPages  || 1;
        var current = scope.currentPage || 1;
        var start   = 1;
        var end     = total;

        if (total > 5) {
          if (current <= 3) {
            // Próximo ao início: ancora a janela nas 5 primeiras páginas
            start = 1;
            end   = 5;
          } else if (current >= total - 2) {
            // Próximo ao fim: ancora a janela nas 5 últimas páginas
            start = total - 4;
            end   = total;
          } else {
            // No meio: centraliza a janela na página atual
            start = current - 2;
            end   = current + 2;
          }
        }

        scope.pages = [];

        for (var i = start; i <= end; i++) {
          scope.pages.push(i);
        }
      };

      /**
       * changePage(page) — navega para a página solicitada.
       *
       * Guard clause tripla:
       *   - page < 1: antes da primeira página (botão "anterior" na página 1)
       *   - page > totalPages: além da última (botão "próximo" na última página)
       *   - page === currentPage: clique na página já ativa (sem re-renderização desnecessária)
       *
       * onChange({ page: page }) notifica o controller pai via expression binding,
       * mapeando o argumento local 'page' ao parâmetro esperado pelo callback.
       */
      scope.changePage = function (page) {
        if (page < 1 || page > scope.totalPages || page === scope.currentPage) {
          return;
        }

        scope.currentPage = page;
        scope.onChange({ page: page });
        scope.buildPages();
      };

      // Reconstrói os botões toda vez que a página atual ou o total de páginas mudar.
      // Cobre dois cenários: navegação do usuário E aplicação de filtros que alteram totalPages.
      scope.$watchGroup(['currentPage', 'totalPages'], function () {
        scope.buildPages();
      });
    }
  };
});
