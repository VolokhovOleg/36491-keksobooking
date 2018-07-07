'use strict';

(function () {
  var pinSize = {
    WIDTH: 70,
    HEIGHT: 50
  };
  var pinsArray = [];
  var mainTemplate = document.querySelector('#ad-template');
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapPin = mainTemplate.content.querySelector('.map__pin');

  window.pins = {
    render: function (array) {
      var pinElement = mapPin.cloneNode(true);
      var pinImg = pinElement.querySelector('img');

      var style = {
        top: 'top:' + (array.location.y - pinSize.HEIGHT / 2) + 'px;',
        left: 'left:' + (array.location.x - pinSize.WIDTH) + 'px;'
      };

      pinElement.style = style.top + style.left;
      pinImg.src = array.author.avatar;
      pinImg.alt = array.offer.title;

      pinElement.addEventListener('click', function () {
        window.card.render(array);
      });

      pinsArray.push(pinElement);

      mapPinsBlock.appendChild(pinElement);
    },
    delete: function () {
      for (var i = 0; i < pinsArray.length; i++) {
        pinsArray[i].remove();
      }
      pinsArray = [];
    }
  };
})();
