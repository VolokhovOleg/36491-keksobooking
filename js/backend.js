'use strict';

(function () {
  var popupError = document.querySelector('.popup-error');
  var popupErrorMessage = popupError.querySelector('.popup-error__message');
  var errorMessage = {
    'PAGE_NOT_FOUND': 'Страница не найдена.',
    'SERVER_ERROR': 'Проблема с сервером.',
    'UNKNOWN_ERROR': 'Ошибка, попробуйте позже.',
    'TIMEOUT': 'Запрос выполняется слишком долго.',
    'NETWORK': 'Потеряно подключение к интернету.'
  };
  var timeoutDuration = 10000;
  var url = {
    'adsData': 'https://js.dump.academy/keksobooking/data',
    'form': 'https://js.dump.academy/keksobooking'
  };

  var createRequest = function (onError, onLoad, request) {
    var requestStatus = {
      200: function () {
        onLoad(request.response);
      },
      404: function () {
        onError(errorMessage.PAGE_NOT_FOUND);
      },
      500: function () {
        onError(errorMessage.SERVER_ERROR);
      },
      default: function () {
        onError(errorMessage.UNKNOWN_ERROR);
      }
    };

    request.responseType = 'json';
    request.timeout = timeoutDuration;

    request.addEventListener('error', function () {
      onError(errorMessage.NETWORK);
    });

    request.addEventListener('timeout', function () {
      onError(errorMessage.TIMEOUT);
    });

    request.addEventListener('load', function () {
      (requestStatus[request.status] || requestStatus['default'])();
    });
  };

  window.backend = {
    dataLoad: function (onError, onLoad) {
      var xhr = new XMLHttpRequest();
      createRequest(onError, onLoad, xhr);
      xhr.open('GET', url.adsData);
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
