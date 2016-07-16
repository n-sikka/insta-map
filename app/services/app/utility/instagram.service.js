(function(){
	'use strict';

  angular
  .module('ng-app')
  .service('InstagramService', fn);

  function fn($location, $state, $http) {
    var client_id = "c57f14bc16d840288f3c178eddef1f66";

    return {
			login: function(){
        window.open('https://www.instagram.com/oauth/authorize/?client_id=c57f14bc16d840288f3c178eddef1f66&redirect_uri=http://localhost:3000/&response_type=token&scope=public_content','_self');
      },
      signout: function() {
        localStorage.removeItem('token');
        $state.reload();
      },
      getUser: function() {
        return $http({
          method: 'JSONP',
          url: "https://api.instagram.com/v1/users/self/?access_token=" + localStorage.getItem('token')  + "&callback=JSON_CALLBACK"
        });
      },
      getLocId: function(coordinates) {
        return $http({
          method: 'JSONP',
          url: "https://api.instagram.com/v1/locations/search?lat=" + coordinates.lat() +"&lng="+ coordinates.lng() + "&access_token="+ localStorage.getItem('token') + "&callback=JSON_CALLBACK"
        })
      },
      getUserImages: function(token) {
        return $http({
          method: 'JSONP',
          url: "https://api.instagram.com/v1/users/self/media/recent/?access_token="+ localStorage.getItem('token') + "&callback=JSON_CALLBACK"
        })
      }
    }

  }


})();
