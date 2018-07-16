'use strict';

(function () {
  var ANY_VALUE = 'any';
  var dataArray = [];
  var filter = document.querySelector('.map__filters');
  var filterHouse = document.querySelector('#housing-rooms');
  var filterType = document.querySelector('#housing-type');
  var filterPrice = document.querySelector('#housing-price');
  var filterGuests = document.querySelector('#housing-guests');
  var filterFeatures = document.querySelector('#housing-features');
  var priceValue = {
    'low': {
      MIN: 0,
      MAX: 9999
    },
    'middle': {
      MIN: 10000,
      MAX: 50000
    },
    'high': {
      MIN: 50001,
      MAX: Infinity
    }
  };

  var checkValue = function (type, value) {
    return ANY_VALUE === value || type.toString() === value;
  };

  var checkPrice = function (type, value) {
    return ANY_VALUE === value || type >= priceValue[value].MIN && type <= priceValue[value].MAX;
  };

  var filterAds = function () {
    var checkedElements = filterFeatures.querySelectorAll('input:checked');
    var filtredArray = dataArray;

    window.card.remove();
    window.pins.delete();

    filtredArray = filtredArray.filter(function (item) {
      return checkValue(item.offer.type, filterType.value);
    });

    filtredArray = filtredArray.filter(function (item) {
      return checkPrice(item.offer.price, filterPrice.value);
    });

    filtredArray = filtredArray.filter(function (item) {
      return checkValue(item.offer.rooms, filterHouse.value);
    });

    filtredArray = filtredArray.filter(function (item) {
      return checkValue(item.offer.guests, filterGuests.value);
    });

    filtredArray = filtredArray.filter(function (item) {
      return Array.from(checkedElements).every(function (element) {
        return item.offer.features.includes(element.value);
      });
    });

    window.map.createAds(filtredArray);
  };

  filter.addEventListener('change', function () {
    window.utils.debounce(filterAds);
  });

  window.filters = {
    copyData: function (data) {
      dataArray = data.slice();
    },
    reset: function () {
      filter.reset();
    }
  };
})();
