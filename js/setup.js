'use strict';

(function () {
  // события и асинхронность
  var setupEl = document.querySelector('.setup');
  var setupOpenEl = document.querySelector('.setup-open');
  var setupCloseEl = setupEl.querySelector('.setup-close');
  var setupFormEl = setupEl.querySelector('.setup-wizard-form');

  // открытие окна настроек
  var openSetupPopup = function () {
    setupEl.classList.remove('hidden');

    var onLoadForm = function () {
      setupFormEl.classList.add('hidden');
    };

    setupFormEl.addEventListener('submit', function (evt) {
      window.backend.save(new FormData(setupFormEl), onLoadForm, window.similar.onError);
      evt.preventDefault();
    });
  };
  var closeSetupPopup = function () {
    setupEl.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeSetupPopup);
  };
  setupOpenEl.addEventListener('click', function () {
    openSetupPopup();
    document.addEventListener('keydown', onPopupEscPress);
  }
  );
  // закрытие окна настроек
  setupOpenEl.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openSetupPopup);
  });
  setupCloseEl.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeSetupPopup);
  });
  setupCloseEl.addEventListener('click', function () {
    closeSetupPopup();
  });

})();
