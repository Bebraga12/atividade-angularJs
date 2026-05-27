angular.module('atividadeApp').controller('mainController', function ($scope, dataService, toastService) {
  var allMenuItems = dataService.getMenuItems();

  $scope.faqItems = dataService.getFaqItems();
  $scope.menuItems = allMenuItems;
  $scope.progress = 35;
  $scope.tabs = dataService.getTabs();
  $scope.dropdownOptions = dataService.getDropdownOptions();

  $scope.searchQuery = '';
  $scope.selectedCategory = 'all';
  $scope.currentPage = 1;
  $scope.itemsPerPage = 5;
  $scope.filteredMenuItems = [];
  $scope.pagedMenuItems = [];
  $scope.totalPages = 1;
  $scope.profileTabs = $scope.tabs;

  $scope.applyFilters = function () {
    // Apply search and category filters before slicing the current page.
    var query = ($scope.searchQuery || '').toLowerCase();

    $scope.filteredMenuItems = allMenuItems.filter(function (item) {
      var matchesCategory = $scope.selectedCategory === 'all' || item.category === $scope.selectedCategory;
      var matchesQuery = !query ||
        item.name.toLowerCase().indexOf(query) !== -1 ||
        item.description.toLowerCase().indexOf(query) !== -1 ||
        item.category.toLowerCase().indexOf(query) !== -1;

      return matchesCategory && matchesQuery;
    });

    $scope.totalPages = Math.max(1, Math.ceil($scope.filteredMenuItems.length / $scope.itemsPerPage));

    if ($scope.currentPage > $scope.totalPages) {
      $scope.currentPage = $scope.totalPages;
    }

    $scope.sliceMenu();
  };

  $scope.sliceMenu = function () {
    // Keep the visible menu list in sync with the current page.
    var start = ($scope.currentPage - 1) * $scope.itemsPerPage;
    $scope.pagedMenuItems = $scope.filteredMenuItems.slice(start, start + $scope.itemsPerPage);
  };

  $scope.goToPage = function (page) {
    if (page < 1 || page > $scope.totalPages) {
      return;
    }

    $scope.currentPage = page;
    $scope.sliceMenu();
  };

  $scope.filterMenu = function (option) {
    $scope.selectedCategory = option && option.value ? option.value : 'all';
    $scope.currentPage = 1;
    $scope.applyFilters();
  };

  $scope.increaseProgress = function () {
    $scope.progress = Math.min(100, $scope.progress + 10);
  };

  $scope.decreaseProgress = function () {
    $scope.progress = Math.max(0, $scope.progress - 10);
  };

  $scope.showToast = function (type, message) {
    toastService.show(type, message);
  };

  $scope.toast = toastService;

  $scope.applyFilters();
});
