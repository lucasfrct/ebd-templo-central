/*
* firebase.publication.service.js
* Autor: Lucas Costa
* Data: Dezembro de 2019
*/
( ( ) => { 
    "use strict";

    angular
        .module ( "liber" )
        .service ( "$firebase.publication.service", [ "$firebase.user.service", FirebasePublicationService] );

    function FirebasePublicationService ( $firebaseUserService ) {
        const $that = this;

        $that.scope = $firebaseUserService.scope;
        $that.user = null;
        $that.publication = Publication;
        $that.profession = Profession;

        $firebaseUserService.scope ( ( ) => {
            $that.user = $firebaseUserService.user;                                         // Set usuario in scope
        } );

        //@param: $arg - object or function
        //@param: $callback - function
        function Publication ( $arg, $callback ) {
            $firebaseUserService.consultDocs ( $arg, $callback, "publications", ( $publications ) => { 
                $that.user.publications = $publications;                                      // Set Address in User
                //console.log ( $that.user.error );
            } );
        };

        function Profession ( $callback ) {
            $firebaseUserService.consultDocs ( $callback, null, "professions", ( $professions ) => { 
                $that.user.professions = $professions; 
                //console.log ( $that.user.error );
            } );
        };
    };

} ) ( );