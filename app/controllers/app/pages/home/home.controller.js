(function(){


  angular
  .module('ng-app')
  .controller('HomeController' , controller);

  function controller(MapService){
    var vm = this;

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

  }


})();
