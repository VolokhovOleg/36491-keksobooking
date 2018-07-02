'use strict';

(function () {
  var adsArray = [];

  window.getAdsArray = function (amount) {
    for (var i = 0; i < amount; i++) {
      adsArray[i] = window.createAd(i);
      window.renderPin(adsArray[i]);
    }
  };
})();
