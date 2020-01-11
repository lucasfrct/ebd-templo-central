(()=> {
    "use strict";
    angular
        .module("ebd")
        .config(HomeConfig)
        .component("home", {
            templateUrl: "app/home/home.html",
            controller: [ "$scope", HomeController ],
        });

    function HomeConfig( $routeProvider ) {
        $routeProvider.when("/", { template: "<home container></home>" });
    };

    function HomeController ( $scope ) {
        $scope.home = "Load Home!";
    }
})();