(function() {
  'use strict';

  angular
    .module('ng-app')
    .config(configure);

  function configure($stateProvider, $urlRouterProvider) {

    var _dirPath = 'app/views/app/';

    $urlRouterProvider.otherwise('/');
    $urlRouterProvider.when('/', '/home');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'app/views/base.html'
      })
      .state('home', {
        url: '/home',
        parent: 'base',
        views: {
          "content": {
            templateUrl: _dirPath + 'pages/home/home.html',
            controller:'HomeController',
            controllerAs:'vm'
          }
        }
      })
      .state('access_token', {
        url: '/access_token=:token:scope',
        controller: function($rootScope, $stateParams) {
          localStorage.setItem('token', $stateParams.token);
        },
        resolve: {
          location: [
              '$location',
               function ($location) {
                $location.path('/');
          }]
        }
      });

  }

})();
