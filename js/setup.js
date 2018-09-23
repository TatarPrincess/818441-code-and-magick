'use strict';

(function () {

  var names = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireBallColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // генератор случайных целых чисел
  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var getWizardAttrProperty = function (arr) {
    var propertyColor = arr[getRandomIntInclusive(0, arr.length - 1)];
    return propertyColor;
  };

  // создаем массив объектов волшебников
  var wizardArray = [];
  for (var i = 0; i < 4; i++) {
    wizardArray[i] = {
      name: getWizardAttrProperty(names) + ' ' + getWizardAttrProperty(surnames),
      coatColor: getWizardAttrProperty(coatColors),
      eyesColor: getWizardAttrProperty(eyesColors)
    };
  }

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

  // открытие окна настроек
  var openSetupPopup = function () {
    setupEl.classList.remove('hidden');
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
    var color = getWizardAttrProperty(coatColors);
    wizardCoatEl.style.fill = color;
    wizardCoatHiddenEl.value = color;
  });
  wizardEyesEl.addEventListener('click', function () {
    var color = getWizardAttrProperty(eyesColors);
    wizardEyesEl.style.fill = color;
    wizardEyesHiddenEl.value = color;
  });
  wizardFireBallEl.addEventListener('click', function () {
    wizardFireBallEl.style.backgroundColor = getWizardAttrProperty(fireBallColors);
  });
})();
