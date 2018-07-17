'use strict';

(function () {
  var TIMEOUT = 10000;
  var ErrorMessages = {
    'PAGE_NOT_FOUND': 'Страница не найдена.',
    'SERVER_ERROR': 'Проблема с сервером.',
    'UNKNOWN_ERROR': 'Ошибка, попробуйте позже.',
    'TIMEOUT': 'Запрос выполняется слишком долго.',
    'NETWORK': 'Потеряно подключение к интернету.'
  };
  var Urls = {
    'ADS_DATA': 'https://js.dump.academy/keksobooking/data',
    'FORM': 'https://js.dump.academy/keksobooking'
  };

  var createRequest = function (onError, onLoad, request) {
    var RequestStatus = {
      200: function () {
        onLoad(request.response);
      },
      404: function () {
        onError(ErrorMessages.PAGE_NOT_FOUND);
      },
      500: function () {
        onError(ErrorMessages.SERVER_ERROR);
      },
      default: function () {
        onError(ErrorMessages.UNKNOWN_ERROR);
      }
    };

    request.responseType = 'json';
    request.timeout = TIMEOUT;

    request.addEventListener('error', function () {
      onError(ErrorMessages.NETWORK);
    });

    request.addEventListener('timeout', function () {
      onError(ErrorMessages.TIMEOUT);
    });

    request.addEventListener('load', function () {
      (RequestStatus[request.status] || RequestStatus['default'])();
    });
  };

  window.backend = {
    dataLoad: function (onError, onLoad) {
      var xhr = new XMLHttpRequest();
      createRequest(onError, onLoad, xhr);
      xhr.open('GET', Urls.ADS_DATA);
      xhr.send();
    },
    sendForm: function (onError, onLoad, data) {
      var xhr = new XMLHttpRequest();
      createRequest(onError, onLoad, xhr);
      window.filters.reset();
      xhr.open('POST', Urls.FORM);
      xhr.send(data);
    },
    onError: function (error) {
      window.utils.renderError(error);
    }
  };
})();
