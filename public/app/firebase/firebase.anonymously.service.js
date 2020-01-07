(()=> {
    "use strict"
    angular 
        .module("ebd")
        .service ("$firebase.anonymously.service", ["$firebase.init.service", "$firebase.sign.service", "$firebase.login.service", AnonymouslyService] )
    
    function AnonymouslyService ( init, loginService, signService ) {

        const that = this;

        that.store 	= firebase.firestore ( );	

        console.log ("anon")
        that
			.store
			.collection ( "users" )
			.doc ( )
			.set ( { email: "Lucas", telefone: "000000" } )	
			.then ( ( ) => { 
			} )
			.catch ( ( error ) => {				
			} )
    };
})()