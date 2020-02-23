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

        $scope.control = {
            articles: [],
        }

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
            {
                image: "vendor/images/publications/callers/licao-3.jpg",
                auth: "Prof. Cícero Soares",
                date: "19 de Janeiro",
                lesson: "03",
                title: "A Natureza do ser Humano",
                quarter: "1",
                year: "2020",
                class: "Adultos",
                text: "Corpo, Alma e Espirito constituem a formação tricotômica do ser e a essência da natureza humana, o objeto de estudo da terceira lição deste trimestre. Veremos que a existência humana está condicionada a integralidade do ser, isto é, não existe vida na ausência de qualquer um destes componentes. Nossa natureza é complexa e, sobretudo, maravilhosa, como bem argumenta o comentarista Claudionor de Andrade referenciando-se de textos inspirados e inspiradores das sagradas letras.<br><br> Partindo do aspecto geral da complexidade da natureza humana o autor utiliza como método para explicá-la a comparação desta com a natureza divina e angelical mostrando as distinções entre estas e aquela e evidenciando a necessidade de completude para existência do ser, bem como a inseparabilidade das partes constitutivas. Em sequência subdivide a lição em tópicos abordando em cada parte características especificas de cada componente do ser: corpo, alma e espírito, respectivamente.<br><br> Compreender a Natureza Humana, a luz das escrituras sagradas, reveste-se de singular importância, pois além da compreensão da nossa essência nos conscientizamos que a adoração e o serviço ao Senhor só faz sentido quando realizados com inteireza do Ser. Daí a exortação paulina registrada na carta aos Tessalonicenses (1 Ts 5.23) e o objetivo da lição: consagra-se inteiramente ao Senhor enquanto aguardamos a Sua vinda.<br><br>Portanto, ler, meditar, refletir cada item desta lição e participar da Escola Bíblica Dominical, aprendendo e contribuindo, são atitudes sábias e enriquecedoras, sobretudo, úteis para edificação do crente e da Igreja do Senhor.",
            },
        ].reverse()
    }
})()