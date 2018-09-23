'use strict';

(function () {
  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload');
  var dialogClose = setupDialogElement.querySelector('.setup-close');
  var setupOpenEl = document.querySelector('.setup-open');
  var DEFAULT_POSITION_TOP = '80px';
  var DEFAULT_POSITION_LEFT = '50%';

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (EvtPrev) {
          EvtPrev.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // закрытие окна
  var setDefaultPosition = function () {
    setupDialogElement.style.top = DEFAULT_POSITION_TOP;
    setupDialogElement.style.left = DEFAULT_POSITION_LEFT;
  };

  var closeSetupPopup = function () {
    setupDialogElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setDefaultPosition();
  };

  dialogClose.addEventListener('click', function () {
    closeSetupPopup();
  });

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeSetupPopup);
  };
  setupOpenEl.addEventListener('click', function () {
    document.addEventListener('keydown', onPopupEscPress);
  }
  );
})();
