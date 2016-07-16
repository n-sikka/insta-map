(function() {
	'use strict';

	angular
		.module('ng-app')
		.controller('NavbarController' , controller);

	function controller(InstagramService){
		var vm = this;

		if(localStorage.getItem('token')) {
			vm.authorized = true;
		}else {
			vm.authorized = false;
		}
		
		vm.login = function() {
			InstagramService.login();
		}
		vm.logout = function() {
			InstagramService.signout();
		}
	}
})();
