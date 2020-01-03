(()=> {
    "use strict"
    angular
        .module("ebd")
        .component("footer", {
            templateUrl: "app/footer/footer.html",
            controller: ["$scope", FooterController]
        })
    
    function FooterController ( $scope ) {
        $scope.footer = "FOOTER LOAD";
    }
})()