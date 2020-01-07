/*
* firebase.init.service.js
* Autor: Lucas Costa
* Data: Novembro de 2019
*/
( ( ) => {
    "use strict";
    
	angular
		.module ( "ebd" )                                                                 // module
		.service ( "$firebase.init.service", FirebaseInitService )                          // set service
		.run ( onInitFirebase );                                                            // auto load

	function FirebaseInitService ( ) {
		const $that 		= this;                                                         // captura contexto
		$that.id 			= "templo-central";                                          // id do SGDB
        $that.project       = $that.id;                                                     // Project do SGDB
        $that.response      = { code: "", message: "", user: null };                        // resposnta padrao     
	};

	// Iniciar o firebase apos caregar todos os modulos
    function onInitFirebase ( ) {

        const $firebaseConfig = {                                                             // Config Firebase
            apiKey:             "AIzaSyBL_ya66jwsQ5RblIDzqP0RKtcf-x3s-bk",                  // Key
            authDomain:         "templo-central.firebaseapp.com",                        // Domain
            databaseURL:        "https://templo-central.firebaseio.com",                 // URL
            projectId:          "templo-central",                                        // ID do Projeto
            storageBucket:      "templo-central.appspot.com",                            // Stoge
            messagingSenderId:  "933431740063",                                             // Key
            appId:              "1:933431740063:web:ade6429f166e473b03c4aa",                      // Token
            measurementId:      "G-4G7WJD5HQ0",
        };

        const $msg = "firebase.init.service | APP: " + $firebaseConfig.projectId + " | >>> "; // mensagem
        var $state = "OFFLINE";                                                             // estado do servico

        if ( typeof firebase === "object" ) {                                               // caso seja um objeto
            $state = "INITIALIZE ONLINE";                                                   // set satate online
            firebase.initializeApp ( $firebaseConfig );                                     // Initialize Firebase SGDB
            firebase.analytics();
        } else {                                                                            // caso nao seja um objeto
            firebase = null;                                                                // Set null SGBD
        };

        console.log ( $msg, $state );
    };
    
} ) ( );