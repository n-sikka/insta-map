(function(){
	'use strict';

  angular
  .module('ng-app')
  .service('InstagramService', fn);

  function fn($rootScope, $location, $http) {
    var client_id = "c57f14bc16d840288f3c178eddef1f66";

    return {
			login: function(){
        var igPopup = window.open("https://instagram.com/oauth/authorize/?client_id=" + client_id +
            "&redirect_uri=" + $location.absUrl().split('#')[0] +
            "&response_type=token", "igPopup");
      },
      getLocId: function(coordinates) {
        return $http.jsonp("https://api.instagram.com/v1/locations/search?lat="+ coordinates.lat() +"&lng="+ coordinates.lng() +"&access_token="+ localStorage.getItem('token') + "&callback=JSON_CALLBACK")
      },
      getUserImages: function(token) {
        return $http.jsonp("https://api.instagram.com/v1/users/self/media/recent/?access_token="+ localStorage.getItem('token') + "&callback=JSON_CALLBACK")
      }
    }

  }


})();
