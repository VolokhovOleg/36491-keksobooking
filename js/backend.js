'use strict';

(function () {
  var statusName = {
    'OK': 200,
    'PAGE_NOT_FOUND': 404,
    'SERVER_ERROR': 500
  };
  var errorMessage = {
    'number': {
      404: 'Страница не найдена.',
      500: 'Проблема с сервером.'
    },
    'unknownError': 'Неизвестная ошибка, попробуйте позже.',
    'timeout': 'Запрос выполняется слишком долго.',
    'network': 'Потеряно подключение к интернету.'
  };
  var thirtySeconds = 30000;
  var url = {
    'ADS_DATA': 'https://js.dump.academy/keksobooking/data',
    'FORM': 'https://js.dump.academy/keksobooking'
  };

  window.dataLoad = function (onError, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = thirtySeconds;

    xhr.addEventListener('error', function () {
      onError(errorMessage.network);
    });

    xhr.addEventListener('timeout', function () {
      onError(errorMessage.timeout);
    });

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case statusName.OK:
          onLoad(xhr.response);
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

    xhr.open('GET', url.ADS_DATA);
    xhr.send();
  };

  window.sendForm = function (onError, onLoad, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = thirtySeconds;

    xhr.addEventListener('error', function () {
      onError(errorMessage.network);
    });

    xhr.addEventListener('timeout', function () {
      onError(errorMessage.timeout);
    });

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case statusName.OK:
          onLoad(xhr.response);
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

    xhr.open('POST', url.FORM);
    xhr.send(data);
  };
})();
