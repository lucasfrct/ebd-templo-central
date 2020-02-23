/*
 * room.component.js
 * Autor: Lucas Costa
 * Data: Janeiro de 2020
 */ 
(()=> {
    "use strict"

    angular
        .module("ebd")
        .config(RoomConfig)
        .component("room", {
            templateUrl: "app/room/room.html",
            controller: ["$scope", RoomController]
        })

    function RoomConfig($routeProvider) {
        $routeProvider.when("/room", { template: "<room></room>"})
    }
    
    function RoomController($scope) {
        $scope.room = "ROOm OK"

        $scope.menu = ["cartazes", "Mapas", "Cursos", "Ilustração", "Catálogos", "Revistas"]
    }
})()