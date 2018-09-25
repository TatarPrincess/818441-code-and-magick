'use strict';

(function () {

  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireBallColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // генератор случайных целых чисел
  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var getRandomArrIndex = function (arr) {
    var randomItem = arr[getRandomIntInclusive(0, arr.length - 1)];
    return randomItem;
  };

  // создание DOM-элемента по шаблону на основе js-объекта
  var createDomElement = function (objectItem) {
    // нашли шаблон в разметке
    var template = document.querySelector('#similar-wizard-template').content.querySelector('div');

    // склонировали
    var domElement = template.cloneNode(true);

    // наполняем данными элемент-клон
    var element = domElement.querySelector('.setup-similar-label');
    element.textContent = objectItem.name;

    element = domElement.querySelector('.wizard-eyes');
    element.style.fill = objectItem.eyesColor;

    element = domElement.querySelector('.wizard-coat');
    element.style.fill = objectItem.coatColor;

    return domElement;
  };

  // отрисовка DOM-элемента на странице
  // нашли родительский элемент
  var parentDomElement = document.querySelector('.setup-similar-list');

  // создали контейнер
  var fragment = document.createDocumentFragment();

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

  var onLoad = function (dataArr) {
    var wizardArray = [];
    for (var i = 0; i < 4; i++) {
      var dataArrItem = getRandomArrIndex(dataArr);
      wizardArray[i] = {
        name: dataArrItem.name,
        coatColor: dataArrItem.colorCoat,
        eyesColor: dataArrItem.colorEyes
      };
    }

    // создаем и заполняем данными DOM-элементы и добавляем их в контейнер
    for (var k = 0; k < wizardArray.length; k++) {
      var domElementFinal = createDomElement(wizardArray[k]);
      fragment.appendChild(domElementFinal);
    }

    // вставка элементов на страницу
    parentDomElement.appendChild(fragment);
    // события и асинхронность
    var setupEl = document.querySelector('.setup');
    var setupOpenEl = document.querySelector('.setup-open');
    var setupCloseEl = setupEl.querySelector('.setup-close');
    var wizardCoatEl = document.querySelector('.wizard-coat');
    var wizardEyesEl = document.querySelector('.wizard-eyes');
    var wizardHiddenPEl = document.querySelectorAll('.setup-wizard-appearance input');
    var wizardCoatHiddenEl = wizardHiddenPEl[0];
    var wizardEyesHiddenEl = wizardHiddenPEl[1];
    var wizardFireBallEl = document.querySelector('.setup-fireball-wrap');
    var setupFormEl = setupEl.querySelector('.setup-wizard-form');

    // открытие окна настроек
    var openSetupPopup = function () {
      setupEl.classList.remove('hidden');

      var onLoadForm = function () {
        setupFormEl.classList.add('hidden');
      };

      setupFormEl.addEventListener('submit', function (evt) {
        window.save(new FormData(setupFormEl), onLoadForm, onError);
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
    // работа с событиями на фигурке волшебника
    wizardCoatEl.addEventListener('click', function () {
      var color = getRandomArrIndex(coatColors);
      wizardCoatEl.style.fill = color;
      wizardCoatHiddenEl.value = color;
    });
    wizardEyesEl.addEventListener('click', function () {
      var color = getRandomArrIndex(eyesColors);
      wizardEyesEl.style.fill = color;
      wizardEyesHiddenEl.value = color;
    });
    wizardFireBallEl.addEventListener('click', function () {
      wizardFireBallEl.style.backgroundColor = getRandomArrIndex(fireBallColors);
    });
    return wizardArray;
  };

  window.load(onLoad, onError);

})();
