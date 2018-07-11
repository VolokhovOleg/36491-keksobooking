'use strict';

(function () {
  var popupError = document.querySelector('.popup-error');
  var popupErrorMessage = popupError.querySelector('.popup-error__message');
  var errorMessage = {
    'pageNotFound': 'Страница не найдена.',
    'ServerError': 'Проблема с сервером.',
    'unknownError': 'Ошибка, попробуйте позже.',
    'timeout': 'Запрос выполняется слишком долго.',
    'network': 'Потеряно подключение к интернету.'
  };
  var tenSeconds = 10000;
  var url = {
    'ADS_DATA': 'https://js.dump.academy/keksobooking/data',
    'FORM': 'https://js.dump.academy/keksobooking'
  };

  var createRequest = function (onError, onLoad, request) {
    var requestStatus = {
      200: function () {
        onLoad(request.response);
      },
      404: function () {
        onError(errorMessage.pageNotFound);
      },
      500: function () {
        onError(errorMessage.ServerError);
      },
      default: function () {
        onError(errorMessage.unknownError);
      }
    };

    request.responseType = 'json';
    request.timeout = tenSeconds;

    request.addEventListener('error', function () {
      onError(errorMessage.network);
    });

    request.addEventListener('timeout', function () {
      onError(errorMessage.timeout);
    });

    request.addEventListener('load', function () {
      (requestStatus[request.status] || requestStatus['default'])();
    });
  };

  window.backend = {
    dataLoad: function (onError, onLoad) {
      var xhr = new XMLHttpRequest();
      createRequest(onError, onLoad, xhr);
      xhr.open('GET', url.ADS_DATA);
      xhr.send();
    },
    sendForm: function (onError, onLoad, data) {
      var xhr = new XMLHttpRequest();
      createRequest(onError, onLoad, xhr);
      xhr.open('POST', url.FORM);
      xhr.send(data);
    },
    onError: function (error) {
      popupErrorMessage.textContent = error;
      popupError.hidden = false;
    }
  };
})();
