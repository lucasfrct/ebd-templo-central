(()=> {
    "use strict"
    angular 
        .module("ebd")
        .component("register", {
            templateUrl: "app/register/register.html",
            controller: ["$scope", RegisterController],
        })

    function RegisterController ( $scope ) {
        $scope.register = "Register LOAD";
    }
})()