angular.module('atividadeApp').factory('toastService', function ($timeout) {
  var hidePromise = null;
  var state = {
    isVisible: false,
    message: '',
    type: 'info'
  };

  function cancelTimer() {
    if (hidePromise) {
      $timeout.cancel(hidePromise);
      hidePromise = null;
    }
  }

  state.show = function (type, message) {
    // Restart the auto-hide timer every time a new toast is shown.
    cancelTimer();
    state.isVisible = true;
    state.type = type || 'info';
    state.message = message || '';

    hidePromise = $timeout(function () {
      state.isVisible = false;
      hidePromise = null;
    }, 4000);
  };

  state.hide = function () {
    cancelTimer();
    state.isVisible = false;
  };

  return state;
});
