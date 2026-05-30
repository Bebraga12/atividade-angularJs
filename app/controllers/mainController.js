/**
 * CONTROLLER PRINCIPAL — AngularJS
 *
 * Controllers são responsáveis por expor dados e comportamentos ao template (view).
 * Tudo que for adicionado a $scope fica acessível diretamente no HTML via {{ expressão }}.
 *
 * Injeção de Dependência (DI): o AngularJS lê os parâmetros da função e injeta
 * automaticamente os services registrados com aqueles nomes — aqui: dataService e toastService.
 */
angular.module('atividadeApp').controller('mainController', function ($scope, dataService, toastService) {

  // Busca todos os itens uma única vez; guarda na variável local (não no $scope)
  // para que o template não acesse diretamente a lista completa — só a página atual.
  var allMenuItems = dataService.getMenuItems();

  // ── Dados estáticos expostos ao template ──────────────────────────────────────
  // Estes valores são lidos diretamente da view com ng-repeat, ng-bind, etc.
  $scope.faqItems         = dataService.getFaqItems();        // Perguntas do accordion
  $scope.menuItems        = allMenuItems;                     // Lista completa (referência)
  $scope.progress         = 35;                               // Valor inicial da barra de progresso (0–100)
  $scope.tabs             = dataService.getTabs();            // Abas do painel de perfil
  $scope.dropdownOptions  = dataService.getDropdownOptions(); // Categorias do filtro

  // ── Estado reativo dos filtros e paginação ────────────────────────────────────
  // Sempre que qualquer um desses valores muda na view (ng-model), o Angular
  // detecta a mudança no ciclo de digest e re-renderiza as partes afetadas.
  $scope.searchQuery      = '';       // Texto digitado na busca em tempo real
  $scope.selectedCategory = 'all';   // Categoria ativa selecionada pelo dropdown
  $scope.currentPage      = 1;       // Página exibida no momento
  $scope.itemsPerPage     = 5;       // Quantos itens cabem por página
  $scope.filteredMenuItems = [];     // Resultado após os filtros (lista completa, sem fatiar)
  $scope.pagedMenuItems   = [];      // Fatia da página atual — o ng-repeat itera sobre esta
  $scope.totalPages       = 1;       // Total de páginas recalculado a cada filtro
  $scope.profileTabs      = $scope.tabs;

  /**
   * applyFilters — filtra o cardápio por categoria E por texto de busca.
   *
   * Fluxo:
   *  1. Array.filter() percorre todos os itens e mantém apenas os que passam em
   *     ambas as condições (categoria E query de texto).
   *  2. Recalcula o total de páginas com base no resultado filtrado.
   *  3. Ajusta a página atual se ela ficou além do novo total.
   *  4. Chama sliceMenu() para montar a fatia da página atual.
   */
  $scope.applyFilters = function () {
    var query = ($scope.searchQuery || '').toLowerCase();

    $scope.filteredMenuItems = allMenuItems.filter(function (item) {
      // Verifica se o item pertence à categoria selecionada (ou 'all' para todas)
      var matchesCategory = $scope.selectedCategory === 'all' || item.category === $scope.selectedCategory;

      // Verifica se o texto aparece no nome, descrição ou categoria do item
      var matchesQuery = !query ||
        item.name.toLowerCase().indexOf(query) !== -1 ||
        item.description.toLowerCase().indexOf(query) !== -1 ||
        item.category.toLowerCase().indexOf(query) !== -1;

      return matchesCategory && matchesQuery;
    });

    // Math.ceil garante que itens que não completam uma página gerem uma página extra.
    // Math.max(1, ...) garante que nunca exibamos "0 páginas" — no mínimo 1.
    $scope.totalPages = Math.max(1, Math.ceil($scope.filteredMenuItems.length / $scope.itemsPerPage));

    // Impede que a página atual fique "no ar" após reduzir o número de páginas
    if ($scope.currentPage > $scope.totalPages) {
      $scope.currentPage = $scope.totalPages;
    }

    $scope.sliceMenu();
  };

  /**
   * sliceMenu — recorta os itens filtrados para exibir apenas a página atual.
   *
   * Array.slice(start, end) retorna uma sub-lista sem modificar o original.
   * start é calculado a partir do índice zero: página 1 → start 0, página 2 → start 5, etc.
   */
  $scope.sliceMenu = function () {
    var start = ($scope.currentPage - 1) * $scope.itemsPerPage;
    $scope.pagedMenuItems = $scope.filteredMenuItems.slice(start, start + $scope.itemsPerPage);
  };

  /**
   * goToPage — navega para uma página específica.
   * Chamado pela diretiva <pagination> via callback on-change="goToPage(page)".
   * Guard clause impede navegação para páginas inválidas.
   */
  $scope.goToPage = function (page) {
    if (page < 1 || page > $scope.totalPages) {
      return;
    }

    $scope.currentPage = page;
    $scope.sliceMenu();
  };

  /**
   * filterMenu — chamado pelo dropdown ao escolher uma categoria.
   * Reseta sempre para a página 1 para evitar exibir uma página vazia
   * quando a nova categoria tem menos itens do que a posição anterior.
   */
  $scope.filterMenu = function (option) {
    $scope.selectedCategory = option && option.value ? option.value : 'all';
    $scope.currentPage = 1;
    $scope.applyFilters();
  };

  // ── Controle da barra de progresso ───────────────────────────────────────────
  // Math.min/max garantem que o valor nunca saia do intervalo 0–100.
  $scope.increaseProgress = function () {
    $scope.progress = Math.min(100, $scope.progress + 10);
  };

  $scope.decreaseProgress = function () {
    $scope.progress = Math.max(0, $scope.progress - 10);
  };

  // ── Toast (notificações) ─────────────────────────────────────────────────────
  // O controller delega completamente ao toastService, mantendo sua responsabilidade
  // restrita à lógica de tela — um exemplo do princípio de responsabilidade única.
  $scope.showToast = function (type, message) {
    toastService.show(type, message);
  };

  // Expõe o objeto de estado do toastService diretamente no $scope.
  // Como é passado por referência, a view sempre lê o estado mais atual
  // sem precisar de eventos ou watchers extras.
  $scope.toast = toastService;

  // ── Inicialização ─────────────────────────────────────────────────────────────
  // Executa os filtros assim que o controller é criado para popular a lista
  // antes do primeiro render da view.
  $scope.applyFilters();
});
