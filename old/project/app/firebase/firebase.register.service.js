/*
* firebase.profession.service.js
* Autor: Lucas Costa
* Data: novenbro de 2019
*/
(( )=> {
    "use strict";

    angular
        .module("ebd")
        .service("$firebase.register.service", ["$firebase.init.service", RegisterService])
    
    function RegisterService(init) {
        const that = this
        
        that.store = firebase.firestore();	
        that.register = Register;
        
        function Register(registry, callback) {

            var record = angular.copy(registry);
            var response = init.response;
            that
                .store
                .collection("users")
                .doc(record.email)
                .set(record)	
                .then(()=> { 
                    response.code = "201"
                    response.message = "Cadastro efetuado com sucesso"
                    response.user = record;
                    callback(response);
                })
                .catch((error)=> {
                    response.code = "404"
                    response.message = "Erro! Favor cadastrar novamente"
                    response.user = record
                    callback(Object.assign(response, error))				
                })
        }
    }

})()