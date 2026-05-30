/**
 * FILTROS CUSTOMIZADOS — AngularJS
 *
 * Filtros transformam valores na view sem alterar o dado original no model.
 * Sintaxe no template: {{ valor | nomeDoFiltro }}
 *                      {{ valor | nomeDoFiltro: argumento }}
 *
 * Cada filter() recebe uma função de fábrica que retorna a função transformadora.
 * A função transformadora recebe o valor a ser formatado e retorna o valor formatado.
 *
 * Exemplos de uso:
 *   {{ item.price | formatPrice }}  →  "$4.50"
 *   {{ item.name  | capitalize   }}  →  "Cold Brew"
 */

// ── formatPrice ───────────────────────────────────────────────────────────────
// Converte um número em string de preço com símbolo de dólar e 2 casas decimais.
angular.module('atividadeApp').filter('formatPrice', function () {
  return function (value) {
    // Number() converte strings numéricas ("4.5") e passa números inalterados.
    var number = Number(value);

    // Proteção contra null, undefined e strings não numéricas ("abc").
    // isNaN() retorna true para qualquer valor que não seja um número válido.
    if (isNaN(number)) {
      return '$0.00';
    }

    // toFixed(2) sempre retorna exatamente 2 casas decimais: 3 → "3.00", 4.5 → "4.50"
    return '$' + number.toFixed(2);
  };
});

// ── capitalize ────────────────────────────────────────────────────────────────
// Converte a primeira letra de cada palavra para maiúscula (title case).
angular.module('atividadeApp').filter('capitalize', function () {
  return function (value) {
    // Guard clause: retorna string vazia para valores falsy (null, undefined, '').
    if (!value) {
      return '';
    }

    // Regex \b\w: \b é o limite de palavra, \w captura o primeiro caractere.
    // Funciona para palavras separadas por espaço, hífen ou outros delimitadores.
    // String() garante que o valor seja tratado como texto mesmo se chegar como número.
    return String(value).replace(/\b\w/g, function (letter) {
      return letter.toUpperCase();
    });
  };
});
