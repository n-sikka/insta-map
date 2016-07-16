(function(){
	'use strict';

  angular
  .module('ng-app')
  .service('MapService', service);

  function service() {
    var coordinates,
        marker;

    // var map = new google.maps.Map(document.getElementById('g-map'));

    return {
			init: function(){
        var map = new google.maps.Map(document.getElementById('g-map'), {
          center: {lat: 28.559266, lng: 77.251582},
          zoom: 13,
          disableDoubleClickZoom: false,
					scrollwheel: false
        })		

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          infoWindow.setPosition(map.getCenter());
          infoWindow.setContent(false ?
                                'Error: The Geolocation service failed.' :
                                'Error: Your browser doesn\'t support geolocation.');
        }
        return map;
      },
      save: function(obj){
        coordinates = obj;
        // console.log("coordinates--> " + coordinates);
      },
      getPos: function() {
        return coordinates;
      },
      setMarker: function(coordinates) {
        if ( marker ) {
          marker.setPosition(coordinates);
        } else {
          marker = new google.maps.Marker({
            position: {lat: coordinates.lat(), lng: coordinates.lng()},
            map: map
          });
        }
      }

    }

  }


})();
