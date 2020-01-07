/*
* firebase.profession.service.js
* Autor: Lucas Costa
* Data: novenbro de 2019
*/
( ( ) => {
    "use strict";

    angular
        .module ( "liber" )
        .service ( "$firebase.profession.service", [ "$firebase.user.service", ProfessionService ] );
    
    function ProfessionService ( $firebaseUserService ) {
        const $that = this;

        $that.scope = $firebaseUserService.scope;
        $that.user = null;
        $that.profession = Profession;

        $firebaseUserService.scope ( ( ) => {
            $that.user = $firebaseUserService.user;                                     // Set usuario in scope
        } );

        //@param: $arg - object or function
        //@param: $callback - function
        function Profession ( $arg, $callback ) {
            $firebaseUserService.consultDocs ( $arg, $callback, "professions", ( $professions ) => { 
                $that.user.professions = $professions;                                      // Set Address in User
                //console.log ( $that.user.error );
            } );
        };
    };

} ) ( );