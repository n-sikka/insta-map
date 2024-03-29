(function(){


  angular
  .module('ng-app')
  .controller('HomeController' , controller);

  function controller(MapService, InstagramService, $http, $rootScope){
    var vm = this;

    //get an instance of the map in our app.
    var map = MapService.init();

    //this is the marker detail window
    var infoWindow;

    vm.user = localStorage.getItem('username');

    //set auth flag for ui/ux
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

          //fetching one id from the list
          vm.id = response.data.data[2].id;

          //if successfull then get information
          InstagramService.getLocData(vm.id)
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

    vm.getByLoc = function() {
      InstagramService.getMediaByLoc(MapService.getPos())
      .then(function(response) {
        console.log(response.data)
      });
    }

    //end of controller
  }


})();
