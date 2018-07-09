'use strict';

(function () {
  var statusName = {
    'OK': 200,
    'PAGE_NOT_FOUND': 404,
    'SERVER_ERROR': 500
  };
  var popupError = document.querySelector('.popup-error');
  var popupErrorMessage = popupError.querySelector('.popup-error__message');
  var errorMessage = {
    'number': {
      404: 'Страница не найдена.',
      500: 'Проблема с сервером.'
    },
    'unknownError': 'Ошибка, попробуйте позже.',
    'timeout': 'Запрос выполняется слишком долго.',
    'network': 'Потеряно подключение к интернету.'
  };
  var thirtySeconds = 30000;
  var url = {
    'ads_data': 'https://js.dump.academy/keksobooking/data',
    'form': 'https://js.dump.academy/keksobooking'
  };

  var createRequest = function (onError, onLoad, request) {
    request.responseType = 'json';
    request.timeout = thirtySeconds;

    request.addEventListener('error', function () {
      onError(errorMessage.network);
    });

    request.addEventListener('timeout', function () {
      onError(errorMessage.timeout);
    });

    request.addEventListener('load', function () {
      switch (request.status) {
        case statusName.OK:
          onLoad(request.response);
          break;
        case statusName.PAGE_NOT_FOUND:
          onError(errorMessage.number[statusName.PAGE_NOT_FOUND]);
          break;
        case statusName.SERVER_ERROR:
          onError(errorMessage.number[statusName.SERVER_ERROR]);
          break;
        default:
          onError(errorMessage.unknownError);
      }
    });
  };

  window.backend = {
    dataLoad: function (onError, onLoad) {
      var xhr = new XMLHttpRequest();
      createRequest(onError, onLoad, xhr);
      xhr.open('GET', url.ads_data);
      xhr.send();
    },
    sendForm: function (onError, onLoad, data) {
      var xhr = new XMLHttpRequest();
      createRequest(onError, onLoad, xhr);
      xhr.open('POST', url.form);
      xhr.send(data);
    },
    onError: function (error) {
      popupErrorMessage.textContent = error;
      popupError.hidden = false;
    }
  };
})();
