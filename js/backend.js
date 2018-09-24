'use strict';
(function () {
  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;

    xhr.responseType = 'json';
    xhr.open('GET', 'https://js.dump.academy/code-and-magick/data');

    xhr.addEventListener('load', function () {
      try {
        var err;
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;

          case 400:
            err = 'Неверный запрос';
            break;

          case 404:
            err = 'Ничего не найдено';
            break;

          default:
            err = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
            break;
        }
        if (err) {
          onError(err);
        }
      } catch (error) {
        onError(error.message);
      }
    });

    xhr.send();
  };

  window.save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 1000;

    xhr.responseType = 'json';
    xhr.open('POST', 'https://js.dump.academy/code-and-magick');
    var err;
    xhr.addEventListener('load', function () {
      try {

        switch (xhr.status) {
          case 200:
            onLoad();
            break;

          case 400:
            err = 'Неверный запрос';
            break;

          default:
            err = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
            break;
        }
        if (err) {
          onError(err);
        }
      } catch (error) {
        onError(error.message);
      }
    });

    xhr.send(data);
  };

})();
