(()=>{
    "use strict"

    angular 
        .module("ebd")
        .component("menu", {
            templateUrl: "app/menu/menu.html",
            controller: ["$scope", MenuController]
        })

    function MenuController ( $scope ) {
        $scope.menu = "Menu Load";
    }
})()