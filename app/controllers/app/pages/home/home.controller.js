(function(){


  angular
  .module('ng-app')
  .controller('HomeController' , controller);

  function controller(MapService, InstagramService, $http, $rootScope){
    var vm = this;

    //get an instance of the map in our app.
    var map = MapService.init();

    var infoWindow;

    vm.user = localStorage.getItem('username');

    if(localStorage.getItem('token')) {
      vm.authorized = true;
    }else {
      vm.authorized = false;
    }
    //instagram access token
    vm.token;
    if(vm.token) {
      return;
    }else {
      vm.token = localStorage.getItem('token');
    }

    vm.getToken = function() {
      window.open('https://www.instagram.com/oauth/authorize/?client_id=c57f14bc16d840288f3c178eddef1f66&redirect_uri=http://localhost:3000/&response_type=token&scope=public_content'
      ,'_self');
    }



    vm.initMap = function() {
      map.addListener('click', function(e) {

        //save the location for further use
        MapService.save(e.latLng);

        //check for duplicaate infoWindow instance
        if(infoWindow){
          infoWindow.setPosition(e.latLng);
          InstagramService.getLocId(e.latLng, vm.token)
          .then(function(response) {
            infoWindow.setContent(response.data.data[0].name);
          });
        }else {
          infoWindow = new google.maps.InfoWindow({map: map});
          infoWindow.setPosition(e.latLng);

          //get location info to display on the marker
          InstagramService.getLocId(e.latLng, vm.token)
          .then(function(response) {
            infoWindow.setContent(response.data.data[0].name);
          });
        }

      });
    }

    vm.login = function() {
      InstagramService.login();
    }


    vm.getData = function() {

        var coordinates = MapService.getPos();

        // to get location Id
        InstagramService.getLocId(MapService.getPos(), vm.token)
        .then(function(response){
          console.log(response.data);
          vm.id = response.data.data[2].id;

          //if successfull then get information
          $http.jsonp("https://api.instagram.com/v1/locations/" + vm.id + "/media/recent?access_token="+ vm.token + "&callback=JSON_CALLBACK")
          .then(function(response) {
            console.log(response.data);
          })

        });
    }


    vm.getUserImages = function (){
      InstagramService.getUserImages().then(function(response) {
        vm.images = response.data.data;
        vm.decoy = response.data.data[11];
        vm.limit = 11;
      })
    }

    //end of controller
  }


})();
