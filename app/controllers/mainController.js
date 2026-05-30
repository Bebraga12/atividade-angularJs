// Controller principal: injeta dataService e toastService para expor dados e ações ao template via $scope.
angular.module('atividadeApp').controller('mainController', function ($scope, dataService, toastService) {

  var allMenuItems = dataService.getMenuItems(); // Lista completa do cardápio (não exposta diretamente ao template)

  $scope.faqItems         = dataService.getFaqItems();        // Perguntas do accordion
  $scope.menuItems        = allMenuItems;                     // Referência ao cardápio completo
  $scope.progress         = 35;                               // Valor inicial da barra de progresso (0–100)
  $scope.tabs             = dataService.getTabs();            // Abas do painel de perfil
  $scope.dropdownOptions  = dataService.getDropdownOptions(); // Categorias do filtro

  $scope.searchQuery      = '';       // Texto digitado na busca em tempo real
  $scope.selectedCategory = 'all';   // Categoria ativa selecionada pelo dropdown
  $scope.currentPage      = 1;       // Página exibida no momento
  $scope.itemsPerPage     = 5;       // Itens exibidos por página
  $scope.filteredMenuItems = [];     // Resultado após os filtros, sem paginar
  $scope.pagedMenuItems   = [];      // Fatia da página atual — iterada pelo ng-repeat
  $scope.totalPages       = 1;       // Total de páginas, recalculado após cada filtro
  $scope.profileTabs      = $scope.tabs;

  // Filtra o cardápio por categoria e texto de busca, recalcula totalPages e chama sliceMenu.
  $scope.applyFilters = function () {
    var query = ($scope.searchQuery || '').toLowerCase();

    $scope.filteredMenuItems = allMenuItems.filter(function (item) {
      var matchesCategory = $scope.selectedCategory === 'all' || item.category === $scope.selectedCategory;
      var matchesQuery = !query ||
        item.name.toLowerCase().indexOf(query) !== -1 ||
        item.description.toLowerCase().indexOf(query) !== -1 ||
        item.category.toLowerCase().indexOf(query) !== -1;
      return matchesCategory && matchesQuery;
    });

    // Math.max(1, ...) garante mínimo de 1 página mesmo com lista vazia.
    $scope.totalPages = Math.max(1, Math.ceil($scope.filteredMenuItems.length / $scope.itemsPerPage));

    if ($scope.currentPage > $scope.totalPages) {
      $scope.currentPage = $scope.totalPages;
    }

    $scope.sliceMenu();
  };

  // Recorta os itens filtrados para exibir apenas a fatia da página atual.
  $scope.sliceMenu = function () {
    var start = ($scope.currentPage - 1) * $scope.itemsPerPage;
    $scope.pagedMenuItems = $scope.filteredMenuItems.slice(start, start + $scope.itemsPerPage);
  };

  // Navega para a página indicada; ignora valores fora do intervalo válido.
  $scope.goToPage = function (page) {
    if (page < 1 || page > $scope.totalPages) {
      return;
    }
    $scope.currentPage = page;
    $scope.sliceMenu();
  };

  // Atualiza a categoria ativa, reseta para página 1 e reaplica os filtros.
  $scope.filterMenu = function (option) {
    $scope.selectedCategory = option && option.value ? option.value : 'all';
    $scope.currentPage = 1;
    $scope.applyFilters();
  };

  // Incrementa/decrementa o progresso mantendo o valor dentro de 0–100.
  $scope.increaseProgress = function () {
    $scope.progress = Math.min(100, $scope.progress + 10);
  };

  $scope.decreaseProgress = function () {
    $scope.progress = Math.max(0, $scope.progress - 10);
  };

  // Delega ao toastService para exibir notificações temporárias na tela.
  $scope.showToast = function (type, message) {
    toastService.show(type, message);
  };

  // Referência direta ao toastService: a view lê isVisible, type e message sem watchers extras.
  $scope.toast = toastService;

  $scope.applyFilters(); // Popula a lista antes do primeiro render.
});
