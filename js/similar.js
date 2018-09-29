'use strict';

(function () {
  // сортировка полученного массива на основании переданного цвета куртки и цвета глаз из render.js

  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.similar.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.similar.eyesColor) {
      rank += 1;
    }

    return rank;
  };
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {

    var sortedWizards = wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    });

    window.render(sortedWizards);
  };

  var onLoad = function (dataArr) {
    for (var d = 0; d < dataArr.length; d++) {
      wizards[d] = dataArr[d];
    }
    updateWizards();
  };

  var onError = function (errMsg) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errMsg;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoad, onError);

  window.similar = {
    updateWizards: updateWizards,
    coatColor: coatColor,
    eyesColor: eyesColor,
    onError: onError
  };

})();
