'use strict';

var names = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatcolors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

// генератор случайных целых чисел
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// генерация случайных объектов волшебников

var getWizardName = function () {
  var wizardName = names[getRandomIntInclusive(0, names.length - 1)] + ' ' + surnames[getRandomIntInclusive(0, surnames.length - 1)];
  return wizardName;
};

var getWizardCoatColor = function () {
  var WizardCoatColor = coatcolors[getRandomIntInclusive(0, coatcolors.length - 1)];
  return WizardCoatColor;
};

var getWizardEyesColor = function () {
  var WizardEyesColor = eyesColors[getRandomIntInclusive(0, eyesColors.length - 1)];
  return WizardEyesColor;
};

var getNewWizardObj = function (attr1, attr2, attr3) {
  var object = {
    name: attr1,
    coatColor: attr2,
    eyesColor: attr3
  };
  return object;
};

// создаем массив объектов волшебников
var wizardArray = [];

var fillWizardArray = function () {
  for (var i = 0; i < 4; i++) {
    wizardArray[i] = getNewWizardObj(getWizardName(), getWizardCoatColor(), getWizardEyesColor());
  }
  return wizardArray;
};

fillWizardArray();

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
for (var i = 0; i < wizardArray.length; i++) {
  var domElementFinal = createDomElement(wizardArray[i]);
  fragment.appendChild(domElementFinal);
}

// вставка элементов на страницу
parentDomElement.appendChild(fragment);


