(function() {
  'use strict';


  // API ENDPOINTS
  angular
    .module('ng-app')
    .constant('INSTA', {
        LOGIN: 'https://www.instagram.com/oauth/authorize/?client_id=c57f14bc16d840288f3c178eddef1f66&redirect_uri=http://localhost:3000/&response_type=token',
        GET_USER : 'https://api.instagram.com/v1/users/self/?access_token=',
        GET_USER_IMAGE : 'https://api.instagram.com/v1/users/self/media/recent/?access_token=',
        GET_LOC_ID : 'https://api.instagram.com/v1/locations/search',
        GET_MEDIA_BY_LOC: 'https://api.instagram.com/v1/media/search'
    })

})()
