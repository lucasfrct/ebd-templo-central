/*
* firebase.user.service.js
* Autor: Lucas Costa
* Data: novenbro de 2019
*/
( ( ) => {
    "user strict";

    angular
        .module ( "ebd" )                                                                 // module
        .service ( "$firebase.user.service", [ "$firebase.login.service", UserServive] );   // set service 

    function UserServive ( $firebaseLoginService ) {
        const $that = this;                                                             // captura escopo
        const $db   = firebase.firestore ( );                                           // init SGBD
        
        $that.scope                 = $firebaseLoginService.scope;                      // scope service
        $that.user                  = null;                                             // User object
        $that.profile               = Profile;                                          // Profile                                                  
        $that.wearer                = Wearer;                                           // User object
        $that.location              = Location;                                         // Location
        $that.address               = Address;                                          // Address
        $that.bank                  = Bank;                                             // Bank
        $that.card                  = Card;                                             // Card
        $that.consultCollections    = consultCollections;                               // realiza consultas em colecoes
        $that.consultDocs           = consultDocs;                                      // realiza consultas em documentos
        
        $firebaseLoginService.scope ( ( $user ) => {
            if ( null !== $user ) {    
                $that.user = $user;                                                     // Set usuario in scope                                 
            };
        } );

        //@param: $arg - object or function
        //@param: $callback - function
        function Profile ( $arg, $callback ) {
            consultCollections ( $arg, $callback, "profiles", ( $profile ) => { 
                $that.user.profile = $profile;                                          // Set Profile in user
            } );
        };

        //@param: $arg - object or function
        //@param: $callback - function
        function Wearer ( $arg, $callback ) {
            consultCollections ( $arg, $callback , "users", ( $user ) => {
                $that.user = Object.assign ( $user, $that.user );                       // Set User in User
            } );
        };

        //@param: $arg - object or function
        //@param: $callback - function
        function Location ( $arg, $callback ) { 
            consultCollections ( $arg, $callback, "locations", ( $location ) => {
                $that.user.location = $location;                                        // Set location in user
            } );
        };

        //@param: $arg - object or function
        //@param: $callback - function
        function Address ( $arg, $callback ) {
            consultDocs ( $arg, $callback, "addresses", ( $addresses ) => { 
                $that.user.addresses = $addresses;                                      // Set Address in User
            } )
        };

        //@param: $arg - object or function
        //@param: $callback - function
        function Bank ( $arg, $callback ) {
            consultDocs ( $arg, $callback, "banks", ( $banks ) => {
                $that.user.banks = $banks;                                              // Set Banks in User 
            } )
        };

        function Card ( $arg, $callback ) {
            consultDocs ( $arg, $callback, "cards", ( $cards ) => {
                $that.user.cards = $cards;                                              // Set cards in User
            } );
        };

        // faz consultas GET e SET
        //@param:   $arg        - object or function
        //@param:   $callback   - function
        //@param:   $collection - string
        //@param:   $devolve    - function
        function consultCollections ( $arg, $callback, $colection, $devolve ) {
            //console.log ( firebase.auth().currentUser);

            const $doc  = $db.collection ( $colection ).doc ( $that.user.uid );                     // init um documento  
            var $data   = null;                                                                     // define tipo de dado

            if ( typeof $arg === "function" && $callback === undefined ) {                          // ser for um GET
                $doc
                    .get ( )                                                                        // obtem dados
                    .then ( ( $docRef ) =>    {                                                     // cacso tenha sucesso
                        $data = $docRef.data ( );                                                   // carrega os dados
                    } )
                    .catch ( ( $error ) => {                                                        // caso haja um erro
                        $that.user.error.push ( $error );                                           // realarta o erro
                    } )
                    .finally ( ( ) => {                                                             // quando terminar 
                        $arg ( $data );                                                             // responde $arg 
                        $devolve ( $data );                                                         // devolve os dados
                    } );
                
            } else if ( typeof $arg == "object" && typeof $callback == "function" ) {               // se for um SET
                $doc
                    .set ( $arg, { merge: true } )                                                  // envia dados
                    .then ( ( ) => {                                                                // caso tenha sucesso
                        $data = $arg;                                                               // carrega os dados
                    } )             
                    .catch ( ( $error ) => {                                                        // casos haja um erro
                        $that.user.error.push ( $error );                                           // relata o erro
                    } )
                    .finally ( ( ) => {                                                             // quando terminar
                        $callback ( $data );                                                        // reponde $callback
                        $devolve ( $data );                                                         // devolve os dados
                    } );
            };       
        };

        // faz consultas GET e SET com retorno de arrays
        //@param:   $arg        - object or function
        //@param:   $callback   - function
        //@param:   $collection - string
        //@param:   $devolve    - function
        function consultDocs ( $arg, $callback, $collection, $devolve ) {

            $collection = $db.collection ( $collection );                                       // inicia uma colecao
            var $data       = null;                                                             // set data
            var $doc        = null;                                                             // set Documento
            
            $arg.uid = $that.user.uid;                                                          // Set ID

            if ( typeof $arg == "function" && $callback == undefined ) {                        // se fom um GET                
                
                $collection                                                                     // inicia uma colecao
                    .where ( "uid", "==", $arg.uid )                                            // paramentros da consulta
                    .get ( )                                                                    // Obtem dados
                    .then ( ( $query ) => {                                                     // caso tenha sucesso
                        $data = Array ( );                                                      // inicia uma arrray
                        $query.forEach ( ( $doc ) => {                                          // itera os documentos
                            $data.push ( $doc.data ( ) );                                       // empilha os dados 
                        } );       
                    } )
                    .catch ( ( $error ) => {                                                    // Caso haja um erro
                        $that.user.error.push ( $error );                                       // Relata o errro
                    } )             
                    .finally ( ( ) => {                                                         // quando terminar
                        $arg ( $data );                                                         // responde Arg
                        $devolve ( $data );                                                     // devolve os dados
                    }  );
                
            } else if ( typeof $arg == "object" && typeof $callback == "function" ) {           // caso for um SET
                
                if ( $arg.id ) {                                                                // Se houver ID
                    $doc = $collection.doc ( $arg.id ).set ( $arg, { merge: true } );           // Atualiza dados
                } else {                                                                        // caso nao haja ID
                    $doc = $collection.add ( $arg );                                            // adiciona dados
                };
                
                $doc                                                                            // faz a requisicao
                    .then ( ( $docRef ) => {                                                    // Caso tenha sucesso
                        if ( $docRef ) {                                                        // Se houver documento
                            $arg.id  = $docRef.id;                                              // Carrega a ID
                            $collection                                                         // inicia uma colecao
                            .doc ( $arg.id )                                                    // seleciona o documento com ID
                            .set ( $arg, { merge: true } )                                      // atualiza dados
                            .then ( ( ) => { } )                                                // Caso tenha Sucesso
                            .catch ( ( $error ) => {                                            // Caso haja Erro
                                $that.user.error.push ( $error );                               // retala um erro
                            } ); 
                        };
                        $data = $arg;                                                           // Set data
                    }       )               
                    .catch ( ( $error ) => {                                                    // caso haja um erro
                        $that.user.error.push ( $error );                                       // relata o erro
                    } )
                    .finally ( ( ) => {                                                         // qunado terminar
                        $callback ( $data );                                                    // resposnde Callback
                        $devolve ( $data );                                                     // devolve os dados
                    } );
            };       
        };

    };

} ) ( );