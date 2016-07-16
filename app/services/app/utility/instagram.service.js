(function(){
	'use strict';

  angular
  .module('ng-app')
  .service('InstagramService', fn);

  function fn($location, $state, $http, INSTA) {
    var client_id = "c57f14bc16d840288f3c178eddef1f66";

    return {
			login: function(){
				var uri = INSTA.LOGIN + '&scope=public_content';
        window.open( uri,'_self');
      },
      signout: function() {
        localStorage.removeItem('token');
        $state.reload();
      },
      getUser: function() {
        return $http({
          method: 'JSONP',
          url: INSTA.GET_USER + localStorage.getItem('token')  + "&callback=JSON_CALLBACK"
        });
      },
      getLocId: function(coordinates) {
        return $http({
          method: 'JSONP',
          url: INSTA.GET_LOC_ID + "?lat=" + coordinates.lat() +"&lng="+ coordinates.lng() + "&access_token="+ localStorage.getItem('token') + "&callback=JSON_CALLBACK"
        })
      },
			getLocData: function(id) {
				return $http({
					method: 'JSONP',
					url: "https://api.instagram.com/v1/locations/" + id + "/media/recent?access_token="+ localStorage.getItem('token') + "&callback=JSON_CALLBACK"
				})
			},
      getUserImages: function(token) {
        return $http({
          method: 'JSONP',
          url: INSTA.GET_USER_IMAGE + localStorage.getItem('token') + "&callback=JSON_CALLBACK"
        })
      },
			getMediaByLoc: function(coordinates) {
				return $http({
					method: 'JSONP',
					url: INSTA.GET_MEDIA_BY_LOC +"?lat=" + coordinates.lat() +"&lng="+ coordinates.lng() + "&max_timestamp=1400700973&distance=5000&access_token="+ localStorage.getItem('token') + "&callback=JSON_CALLBACK"
				})
			}
    }

  }


})();
