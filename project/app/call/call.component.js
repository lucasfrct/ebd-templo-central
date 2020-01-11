(()=> {
    "use strict"

    angular 
        .module("ebd")
        .config(CallConfig)
        .component("call", {
            templateUrl: "app/call/call.html",
            controller: ["$scope", "$sce", CallController],
        })

    function CallConfig($routeProvider) {
        $routeProvider.when("/call", { template: "<call container></call>"})
    }

    function CallController($scope, $sce) {
        $scope.call = "CALL OK"

        $scope.control = {
            articles: [],
        }

        console.log ($sce)

        $scope.control.articles = [
            { 
                image: "vendor/images/publications/callers/eva.jpg",
                auth:"Valberto Souza (Bebeto)",
                date:"12 de janeiro",
                lesson: "02",  
                title: "A CRIAÇÃO DE EVA, A PRIMEIRA MULHER (Gn 2.18-25)", 
                quarter: "1", 
                year: "2020", 
                class: "Adultos", 
                text: "Na lição de hoje, estudaremos sobre a <b>mulher</b> no plano de Deus; pontuaremos aspectos da criação da <b>mulher</b>; e por fim, elencaremos características da missão da <b>mulher</b> como: governar bem a sua casa, ser uma excelente mãe, e ser submissa e auxiliadora do seu marido. <br><br> Você já parou pra pensar que a <b>mulher</b> não é um produto de acabamento da obra de criação do homem e sim um projeto que já estava no plano de Deus, essa e outras informações acerca da <b>criação da mulher</b> você pode conhecer vindo estudar conosco na <b>escola bíblica dominical</b>.",
            },
        ]


    }

})()