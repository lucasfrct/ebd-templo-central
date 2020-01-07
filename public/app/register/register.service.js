(()=>{
    "use strict"
    angular
        .module("ebd")
        .service ("$register.service", ["$firebase.anonymously.service", RegisterService])

    function RegisterService ( firebaseAnonymouslyService ) {
        const that = this;

        console.log ( firebaseAnonymouslyService );
    };
})()