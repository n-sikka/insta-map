(function() {
  'use strict';

  angular
    .module('ng-app', [
      'ui.bootstrap',
      'ui.router'
    ])
    .run(function(InstagramService){

      // Check if User is Authenticated or not
      if(!localStorage.getItem('token')) {
        window.open('https://www.instagram.com/oauth/authorize/?client_id=c57f14bc16d840288f3c178eddef1f66&redirect_uri=http://localhost:3000/&response_type=token&scope=public_content'
                    ,'_self');
      }else {
        InstagramService.getUser().then(function(response) {
          localStorage.setItem('username', response.data.data.username);
        });
      }

    })

})();
