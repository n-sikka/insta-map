(function(){


  angular
  .module('ng-app')
  .controller('HomeController' , controller);

  function controller(MapService, $http, $rootScope){
    var vm = this;
    vm.token = $rootScope.token;

    //flag to check if marker exists already or not
    var marker;

    //get an instance of the map in our app.
    var map = MapService.init();

    //function to set a new marker or update pre-existing
    function setMarker(coordinates) {
      if ( marker ) {
        marker.setPosition(coordinates);
      } else {
        marker = new google.maps.Marker({
          position: {lat: coordinates.lat(), lng: coordinates.lng()},
          map: map
        });
      }
    }

    vm.initMap = function() {
      map.addListener('click', function(e) {
        //save the location for further use
        MapService.save(e.latLng);
        setMarker(e.latLng);
      });
    }

    vm.logPos = function() {
      alert(MapService.getPos());
    }

    vm.getToken = function() {
      window.open('https://www.instagram.com/oauth/authorize/?client_id=c57f14bc16d840288f3c178eddef1f66&redirect_uri=http://localhost:3000&response_type=token&scope=public_content'
                  ,'_self');
    }

    vm.getData = function() {

        var coordinates = MapService.getPos();
        console.log("coordinates--> " + coordinates);

        // to get location Id
        // $http.jsonp("https://api.instagram.com/v1/locations/search?lat="+ coordinates.lat() +"&lng="+ coordinates.lng() +"&access_token="+ vm.token + "&callback=JSON_CALLBACK")
        // .then(function(response) {
        //   console.log(response.data);
        //   // vm.id = response.data.data[2].id;
        // })

        $http.jsonp("https://api.instagram.com/v1/media/search?lat="+ coordinates.lat() +"&lng="+ coordinates.lng() +"&distance=5000&access_token="+ vm.token + "&callback=JSON_CALLBACK")
        .then(function(response) {
          console.log(response.data);
        })



          // var feed = new Instafeed({
          //   get: 'location',
          //   locationId: vm.id,
          //   accessToken: vm.token
          // });
          // feed.run();
          //


    }


  }


})();
