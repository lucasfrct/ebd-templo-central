(()=> {
    "use strict";
    angular 
        .module("ebd")
        .component("header", {
            templateUrl: "app/header/header.html",
            controller: ["$scope", HeaderController ],
        })
    
    function HeaderController ( $scope ) {
        $scope.header = "Header Load";
    }
})()