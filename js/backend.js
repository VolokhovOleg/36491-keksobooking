'use strict';

(function () {
  var mainTemplate = document.querySelector('#ad-template');
  var popupError = mainTemplate.querySelector('.popup-error');
  var popupErrorStyle = '"position: absolute; width: 300px; min-height: 200px; background-color: #ffffff; color: #000000; top: 50%; left: 50%; transform: translateX(-50%)"';

  var onLoad = function () {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      var errorCode = {
        404: 'Страница не найдена.',
        500: 'Проблема с сервером.'
      };
      var errorName = {
        'OK': 200,
        'NOT_FOUND': 404,
        'SERVER_ERROR': 500
      };

      switch (xhr.status) {
        case errorName.OK:
          window.data = xhr.response;
          break;
        case errorName.NOT_FOUND:
          var error = errorCode[404];
          break;
        case errorName.SERVER_ERROR:
          error = errorCode[500];
          break;
        default:
          error = 'Неизвестная ошибка, попробуйте позже';
      }

      if (error) {
        onError(error);
      }
    });

    xhr.send();
  };

  var onError = function (error) {
    popupError.hidden = false;
    popupError.style = popupErrorStyle;
    mainTemplate.querySelector('.popup-popup-error__message').textContent(error);
  };

  onLoad();
})();
