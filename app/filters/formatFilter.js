angular.module('atividadeApp').filter('formatPrice', function () {
  return function (value) {
    var number = Number(value);

    if (isNaN(number)) {
      return '$0.00';
    }

    return '$' + number.toFixed(2);
  };
});

angular.module('atividadeApp').filter('capitalize', function () {
  return function (value) {
    if (!value) {
      return '';
    }

    return String(value).replace(/\b\w/g, function (letter) {
      return letter.toUpperCase();
    });
  };
});
