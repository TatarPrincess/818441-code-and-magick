'use strict';

(function () {
// работа с событиями на фигурке волшебника
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireBallColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var wizardCoatEl = document.querySelector('.wizard-coat');
  var wizardEyesEl = document.querySelector('.wizard-eyes');
  var wizardHiddenPEl = document.querySelectorAll('.setup-wizard-appearance input');
  var wizardCoatHiddenEl = wizardHiddenPEl[0];
  var wizardEyesHiddenEl = wizardHiddenPEl[1];
  var wizardFireBallEl = document.querySelector('.setup-fireball-wrap');
  // генератор случайных целых чисел
  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var getRandomArrIndex = function (arr) {
    var randomItem = arr[getRandomIntInclusive(0, arr.length - 1)];
    return randomItem;
  };

  var DEBOUNCE_INTERVAL = 500; // миллисекунды

  var debounce = function (fun) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var onEyesChange = debounce(
      function (color) {
        window.similar.eyesColor = color;
        window.similar.updateWizards();
      });

  var onCoatChange = debounce(
      function (color) {
        window.similar.coatColor = color;
        window.similar.updateWizards();
      });


  var wizard = {
    onEyesChange: onEyesChange,
    onCoatChange: onCoatChange
  };

  wizardCoatEl.addEventListener('click', function () {
    var color = getRandomArrIndex(coatColors);
    wizardCoatEl.style.fill = color;
    wizardCoatHiddenEl.value = color;
    wizard.onCoatChange(color);
  });

  wizardEyesEl.addEventListener('click', function () {
    var color = getRandomArrIndex(eyesColors);
    wizardEyesEl.style.fill = color;
    wizardEyesHiddenEl.value = color;
    wizard.onEyesChange(color);
  });

  wizardFireBallEl.addEventListener('click', function () {
    wizardFireBallEl.style.backgroundColor = getRandomArrIndex(fireBallColors);
  });

  window.wizard = {
    wizard: wizard,
  };

  return wizard;
})();
