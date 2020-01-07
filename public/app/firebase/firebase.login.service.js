/*
 * firebase.login.service.js
 * Autor: Lucas Costa
 * Data: outubro de 2019
 */                                            
( ( ) => { 
    "use strict";

    angular 
        .module ( "ebd" )                                                                         // module
        .service ( "$firebase.login.service", [ "$firebase.init.service", FirebaseLoginService ] ); // set service
        
    
    // servico provedor de funcoes do banco de dados
    function FirebaseLoginService ( $init ) {      
        const $that = this;

        $that.user          = null;                                                     // usuario corrente
        $that.scope         = FirebaseScope                                             // carrega o scopo do SGDB
        $that.in            = LogIn;                                                    // conecta usuario
        $that.out           = LogOut;                                                   // desconecta usuario atual
        $that.check         = LoginCheck;                                               // verifica se usuario esta logado
        $that.reset         = passwordReset;                                            // resetar password
        $that.verification  = LoginVerification;                                        // verificar autenticidade do email

        FirebaseScope ( ( $user ) => {                                                  // carrega usuario
            if ( null !== $user ) {                                                    // caso exiasta usuario
                $that.user = $user;                                                     // carrega usuario
                $that.user.error = Array ( );                                           // inicia a variavel de erro
            };
        } );
        
        // Carrega o escopo do SGBD
        // @param: $callback - function
        function FirebaseScope ( $callback ) {
            firebase
                .auth ( )                                                               // carrega API auth
                .onAuthStateChanged ( $callback );                                      // responde um callback
        };

        // conecta usuario
        // @param: $user - object
        // @param: $callback - function
        function LogIn ( $user, $callback ) {

            const $response = angular.copy ( $init.response );							// objeto de resposta
			$response.user = $user;	                                                    // carrega usuario

            if ( null == firebase.auth ( ).currentUser ) {                              // se usuaio for nulo
                firebase                                                                // faz a conexao do usuario
                    .auth ( )                                                           // carrega API Auth
                    .signInWithEmailAndPassword ( $user.email, $user.password )         // envia email a password
                    .then ( ( $logInuser ) => {                                         // caso facao o login
                        //console.log ( "LogIn/$logInuser: ", $logInuser );             // imprime dados
                        $that.user = $logInuser.user;
                        $response.code = "201";                                         // codigo de sucesso
                        $response.user.uid = $logInuser.user.uid;                       // captura uid
                        $response.message = "Login efetuado com sucesso.";              // mensagem de sucessso
                    } )
                    .catch ( ( $error ) => {                                            // caso haja errro
                        //console.log ( "LogIn/$error: ", $error );                     // imprime dados
                        $that.user.error.push ( $error );                               // Reporta erro
                        $response.code = "401";                                         // codigo de erro
                        $response.message = "Digite o email e senha corretamente";      // mensagem de erro
                    } )
                    .finally ( ( ) => {                                                 // quando finalizar
                        // console.log ( "LogIn/$response", $response );                // imprime dados
                        $callback ( $response );                                        // chama callback
                    } );
            } else {                                                                    // se existir ususario
                //console.log ( "LogIn/$logInuser: ", $logInuser );                     // imprime dados
                $response.code = "201";                                                 // codigo de sucesso
                $response.user.uid = $that.user.uid;                 // captura uid
                $response.message = "Login renovado com sucesso.";                      // mensagem de sucesso
                $callback ( $response );                                                // chama callback
            };
        };

        function LogOut ( ) {                                                           // desconecta o usuario atual
            //console.log ( "LogOut/currentUser: ", firebase.auth ( ).currentUser );    // imprime os dados
            if ( firebase.auth ( ).currentUser ) { firebase.auth ( ).signOut ( ); };    // deconecta usuario
        };
        
        function LoginCheck ( ) {                                                       // verifica se existe usuario
                // console.log ( "firebase.login.service/LoginCheck/$user", $user );    // imprime dados    
                return ( null != firebase.auth ( ).currentUser ) ? true : false; // retorna true ou false para callback
        };

        // funcao para resetar password, envia um link para o email
        // @param: email - string
        // @param: $callback - function
        function passwordReset ( $email, $callback ) {
            const $response = angular.copy ( $init.response );							// objeto de resposta	   
            
            firebase
                .auth ( )                                                               // carrega API Auth
                .sendPasswordResetEmail ( $email )                                      // envia email de reset
                .then ( ( ) => {                                                        // caso tenha sucesso
                    $response.code = 201;                                               // set codigo
                    $response.message = "Um link de reset foi enviado para seu email";  // set mensagem
                } ).catch ( ( $error ) => {                                             // caso haja erro
                    $that.user.error.push ( $error );                                   // Reportar erro
                    $response.code = $error.code;                                       // set codigo
                    if ( $response.code == 'auth/invalid-email' ) {                     // se email invalido
                        $response.code = "204";                                         // Algum erro 
                        $response.message = "favor digite outro email"                  // mensagem de resposta
                    } else if ( $response.code == 'auth/user-not-found' ) {             // se usuario nao existe
                        $response.code = "204";                                         // algum erro
                        $response.message = "Usuário inexistente";                      // mensagem de resposta
                    };
                } )
                .finally ( ( ) => {                                                     // quando terminar
                    $callback ( $response );                                            // chama callback
                } );
        };

        // funcao para verificar um email. envia um link para o email cadastrado
        // @param: $callback - function
        function LoginVerification ( $callback ) {
            const $response = angular.copy ( $init.response );							// objeto de resposta
            
            firebase
                .auth ( )                                                               // Carrega API Auth
                .currentUser                                                            // seleciona usuario atual
                .sendEmailVerification ( )                                              // envia o link
                .then ( ( ) => {                                                        // caso tenha sucesso   
                    $response.code = "201";                                             // codigo de sucesso
                    $response.message = "Confirmação enviada para seu email";            // mensagem de sucesso
                } )
                .catch ( ( $error ) => {                                                // caso hja erro
                    //console.log ( "firebase.login.service/$error: ", $error );        // imprime error
                    $that.user.error.push ( $error );                                   // Reporta erro
                    $response.code = "204";                                             // codigo de sucesso
                    $response.message = "Erro ao enviar o emaill";                      // mensagem de erro
                } )
                .finally ( ( ) => {                                                     // quando terminar
                    $callback ( $response );                                            // chama callback
                } );
        };
    };

} ) ( );