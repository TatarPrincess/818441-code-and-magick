'use strict';

(function () {

  window.render = function (wizardArray) {
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
      element.style.fill = objectItem.colorEyes;

      element = domElement.querySelector('.wizard-coat');
      element.style.fill = objectItem.colorCoat;

      return domElement;
    };

    // отрисовка DOM-элемента на странице
    // нашли родительский элемент
    var parentDomElement = document.querySelector('.setup-similar-list');
    // создали контейнер
    var fragment = document.createDocumentFragment();

    parentDomElement.innerHTML = '';
    for (var k = 0; k < 4; k++) {
      var domElementFinal = createDomElement(wizardArray[k]);
      fragment.appendChild(domElementFinal);
    }
    // вставка элементов на страницу
    parentDomElement.appendChild(fragment);
  };
})();
