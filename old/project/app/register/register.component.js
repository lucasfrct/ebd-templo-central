(()=> {
    "use strict"
    angular 
        .module("ebd")
        .config(RegisterConfig)
        .component("register", {
            templateUrl: "app/register/register.html",
            controller: ["$scope", "$filter", "$firebase.register.service", RegisterController],
        })

    function RegisterConfig ( $routeProvider ) {
        $routeProvider.when("/register", { template: "<register container></register>"})
    }

    function RegisterController($scope, $filter, $firebase) {

        $scope.control = {
            classes: [
                "Crianças: 2 a 4 anos", 
                "Juniores: 5 a 11 anos ", 
                "Adolescentes: 12 a 15 anos", 
                "Jovens: 16 anos ou mais", 
                "Adultos", 
                "Batismo",
            ],
            msg:"",
            tel:"",
            maskTel: MaskTel,
            clearMaskTel: ClearMaskTel,
            date: "",
            maskDate: MaskDate,
            clearMaskDate: clearMaskDate,
            toggleModal: ToggleModal,
            toggle: "",
        } 
        
        $scope.registry = { 
            name: "",
            email: "",
            telefone: "",
            birthday: "",
            marital: "",
            genre: "",
            class: "",
        }

        loadTel($scope.registry.telefone)
        loadDate($scope.registry.birthday);

        $scope.register = Register;

        function checkName(name) {
            return (name.length >= 5 && (name.indexOf(" ") != -1)) ? true : false 
        }

        function checkEmail(email){
            return (email.length >= 7 && (email.indexOf("@") != -1) && (email.indexOf(".com") != -1)) ? true: false
        }

        function checKTelefone(telefone){
            return (telefone.length >= 13) ? true: false
        }

        function checkBirthday ( birthday ) {
            return ( birthday.length == 10 && birthday.split("-").length == 3) ? true : false
        }

        function checkMarital( marital ) {
            return (marital == "single" || marital == "married") ? true : false
        }

        function checkGenre( genre ) {
            return (genre == "male" || genre == "female") ? true : false
        }

        function checkClass(cl){
            return ($scope.control.classes.filter((item)=>{ return item == cl }).length == 1) ? true : false
        }

        function loadTel(tel) {
            $scope.control.tel = tel;
        }

        function MaskTel ( ) {
            var par1 = ""
            var par2 = ""

            $scope.control.tel = $scope.control.tel
                                    .replace(/\(/g, "")
                                    .replace(/\)/g, "")
                                    .replace(" ", "")

            if($scope.control.tel.length >= 0 ) { par1 = "(" }
            if($scope.control.tel.length >= 2) { par2 = ") " }

            var code = $scope.control.tel.substring(0,2)
            var tel = $scope.control.tel.substring(2,11)
            
            $scope.control.tel = String(par1+code+par2+tel)
        }

        function ClearMaskTel () {
            console.log("keyup")
            $scope.control.tel = $scope.control.tel.substring(0,14);
            if($scope.control.tel.length >= 13) {
                $scope.registry.telefone = angular.copy($scope.control.tel)
            }
        }

        function loadDate(date) {
            $scope.control.date = date.split("-").reverse().join("/")
        }

        function MaskDate( ) {
            var bar1 = ""
            var bar2 = ""
            $scope.control.date = $scope.control.date.replace(/\//g, "")
            if($scope.control.date.length >= 2) { bar1 = "/" }
            if($scope.control.date.length >= 4) { bar2 = "/" }
            var d = $scope.control.date.substring(0,2)
            var m = $scope.control.date.substring(2,4)
            var y = $scope.control.date.substring(4,8)
            $scope.control.date = String(d+bar1+m+bar2+y)
        }

        function clearMaskDate ( ) {
            $scope.control.date = $scope.control.date.substring(0,10);
            if($scope.control.date.length >= 10) {
                $scope.registry.birthday = angular.copy($scope.control.date).split("/").reverse().join("-")
            }
        }

        function Validator ( registry ) {

            MaskTel()
            ClearMaskTel()
            MaskDate () 
            clearMaskDate()

            $scope.valid = {
                name: "",
                email: "",
                telefone: "",
                birthday: "",
                marital:"",
                genre: "",
                class: "",
                alert: [],
            }

            $scope.valid.name = action(checkName(registry.name))            
            $scope.valid.email = action(checkEmail(registry.email)) 
            $scope.valid.telefone = action(checKTelefone(registry.telefone))
            $scope.valid.birthday = action(checkBirthday(registry.birthday))
            $scope.valid.marital = action(checkMarital(registry.marital))
            $scope.valid.genre = action(checkGenre(registry.genre))
            $scope.valid.class = action(checkClass(registry.class))

            function action ( val ) {
                return (val) ? "success" : "danger"
            }

            if (!checkName(registry.name)) {
                $scope.registry.name = ""
                $scope.valid.alert.push("Favor inserir um nome e sobrenome com mais de 5 letras");
            } 

            if (!checkEmail(registry.email)) {
                $scope.registry.email = ""
                $scope.valid.alert.push("Favor inserir um email válido");
            }

            if (!checKTelefone(registry.telefone)) {
                $scope.registry.telefone = ""
                $scope.control.tel = ""
                $scope.valid.alert.push(" Favor inserir um Telefone válido");
            } 

            if (!checkBirthday(registry.birthday)) {
                $scope.registry.birthday = ""
                $scope.control.date = ""
                $scope.valid.alert.push(" Favor inserir uma data no formato xx/xx/xxxx");
            } 

            if (!checkMarital(registry.marital)) {
                $scope.registry.marital = ""
                $scope.valid.alert.push(" Favor escolher um estado civil");
            }

            if (!checkGenre(registry.genre)) {
                $scope.registry.genre = ""
                $scope.valid.alert.push(" Favor escolher um sexo");
            }

            if (!checkClass(registry.class)) {
                $scope.registry.class = ""
                $scope.valid.alert.push(" Favor escolher uma classe da EBD");
            } 

            return (
                checkName(registry.name)
                && checkEmail(registry.email)
                && checKTelefone(registry.telefone)
                && checkBirthday(registry.birthday)
                && checkMarital(registry.marital)
                && checkGenre(registry.genre)
                && checkClass(registry.class)
            ) ? true : false;
            
        }

        function Register(registry) {
           
            if(Validator(registry)){
                ToggleModal();
                $scope.control.msg = "Processando o cadastro"
                $firebase.register(registry, (response)=>{
                    $scope.control.msg = response.message;
                    $scope.$apply();
                })
            } else {
                $scope.control.state = false;
            }
        }

        function ToggleModal ( ) {
            $scope.control.toggle = ( $scope.control.toggle == "" ) ? "active" : "";
        };
    }
})()