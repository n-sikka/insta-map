(function() {
  'use strict';

  angular
    .module('ng-app', [
      'ui.bootstrap',
      'ui.router'
    ])
    .run(function(InstagramService, INSTA){

      // Check if User is Authenticated or not
      if(!localStorage.getItem('token')) {
        var uri = INSTA.LOGIN + '&scope=public_content';
        window.open( uri,'_self');
      }else {
        InstagramService.getUser().then(function(response) {
          localStorage.setItem('username', response.data.data.username);
        });
      }

    })

})();
