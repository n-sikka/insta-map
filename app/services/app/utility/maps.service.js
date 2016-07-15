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
            zoom: 8,
            disableDoubleClickZoom: true
        })
        return map;
      },
      save: function(obj){
        coordinates = obj;
      },
      getPos: function() {
        return coordinates;
      },
      setPos: function() {
        
      }
    }

  }


})();
