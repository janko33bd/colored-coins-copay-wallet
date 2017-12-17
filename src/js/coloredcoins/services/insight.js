'use strict';


angular.module('copayAddon.coloredCoins').factory('insight', function ($http, profileService) {

  function Insight(opts) {
    this.network = opts.network || 'livenet';
    this.url = opts.url;
  }

  Insight.prototype.getTransaction = function(txid, cb) {
    var url = this.url + '/tx/' + txid;

    $http.get(url)
        .success(function (data, status) {
          if (status != 200) return cb(data);
          return cb(null, data);
        })
        .error(function (data, status) {
          return cb(data);
        });
  };

  var livenetInsight = new Insight({ network: 'livenet', url: 'https://node.blackcoin.io/insight-api' });

  return {
    get: function() {
      var fc = profileService.focusedClient;
      return fc.credentials.network = livenetInsight;
    }
  };
});
