// Filtros customizados que transformam valores na view sem alterar o dado original no model.

// Converte um número em string de preço com símbolo de dólar e 2 casas decimais.
angular.module('atividadeApp').filter('formatPrice', function () {
  return function (value) {
    var number = Number(value);
    if (isNaN(number)) { return '$0.00'; } // Proteção contra valores não numéricos.
    return '$' + number.toFixed(2); // toFixed(2) garante sempre 2 casas: 3 → "3.00"
  };
});

// Converte a primeira letra de cada palavra para maiúscula (title case).
angular.module('atividadeApp').filter('capitalize', function () {
  return function (value) {
    if (!value) { return ''; } // Guard clause para valores falsy (null, undefined, '').
    return String(value).replace(/\b\w/g, function (letter) {
      return letter.toUpperCase();
    });
  };
});
