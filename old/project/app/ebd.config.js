(()=> {
	"use strict";

    angular
        .module("ebd")
        .config(EbdConfig)
        .value('$routerRootComponent', 'app');

    // config routes
    // @param $routeProvider - controlador de rotas
    // @param $locationProvider = controlador de URIs
	function EbdConfig ($routeProvider, $locationProvider) { 

        $routeProvider
            .when("/", { template: '<home></home>' } )
            .otherwise( { template: '<home></home' } );

		$locationProvider
            .html5Mode(false)
            //.hashPrefix('!');
	};
})();