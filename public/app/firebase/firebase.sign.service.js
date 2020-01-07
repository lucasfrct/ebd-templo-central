/*
 * firebase.sign.service.js
 * Autor: Lucas Costa
 * Data: outubro de 2019
 */
( ( ) => {
    "use strict";

    angular
        .module ( "ebd" )																			// modulo
        .service ( "$firebase.sign.service", [ "$firebase.init.service", FirebaseSignService ] );	// set serviço
	
    function FirebaseSignService ( $init ) {
        const $that = this;																	// captura contexto
		$that.create    = SignCreate;														// cria um usuario
		$that.store 	= firebase.firestore ( );											// inicia o database firestorea
		
		// cria novo usuario
		// @param: $user - object
		// @param: $callback - function 
		function SignCreate ( $user, $callback ) {
			
			const $response = angular.copy ( $init.response );								// objeto de resposta
			$response.user = $user;															// carrega usuario
			firebase
				.auth ( )																	// carrega a API auth
				.createUserWithEmailAndPassword ( $user.email, $user.password )
				.then ( ( $data ) => {														// Caso tenha sucesso
					//console.log ( "firebase.sign.service/SignCreate/$data: ", $data ); 	// imprime os dados 
					$response.code = "auth/success"; 										// altera o codigo
					$response.user.uid = $data.user.uid;									// carrega o uid
					$response.user.emailVerified = $data.user.emailVerified;				// status do email
				} ).catch ( ( $error ) => { 												// caso haja erro
					//console.log ( "firebase.sign.service/SignCreate/$error: ", $error );	// imprime os dados
					$response = Object.assign ( $response, $error );						// passa o erro para a resposta
				} ).finally ( ( ) => {														// qunado terminar
					
					switch ( $response.code ) {												// faca a selecao
						case "auth/success": 												// caso tenha sucesso
							$response.code 		= "201"; 									// http response 201 - created 
							$response.message 	= "Usuário criado com sucesso!" 			// mensagem de sucesso
							SignInsertTable ( $response, $callback );						// insere novo usuario no database
							break;
						case "auth/email-already-in-use":									// caso email esteja em uso
							$response.code 		= "303"; 									// http response 301 - see outher
							$response.message 	= "Esse email está em uso.";				// mensagem de erro
							$callback ( $response );										// chama callback
							break;
						case "auth/weak-password": 											// caso tenha menos de 6 caracteres
							$response.code 		= "401" 									// http response 401 - unauthenticad
							$response.message 	= "Palavra passe pequena.";					// mensagem de erro
							$callback ( $response );										// chama callback
							break;
						default:															// caso retorne vazio
							$response.code 		= "204"; 									// http response 204 - no content
							$response.message 	= "Aconteceu algum erro no processo." 		// mensagem de erro
							$callback ( $response );										// chama callback
							break;
					};

				} );
		};
	
		// insere novo usuario no database
		// @param: $response - object
		// @param: $callback - function
		function SignInsertTable ( $response, $callback ) {
			const $uid = $response.user.uid;													// carrega UID
			delete $response.user.uid;														// deleta UID

			$that
			.store
			.collection ( "users" )															// seleciona tabela users
			.doc ( $uid )																	// define uma id
			.set ( $response.user )															// adiciona um usuario
			.then ( ( ) => { 																// Caso tenha sucesso
				//console.log ( "firebase.sign.service/SignInsertTable/SUCCESS" ); 			// imprime mensagem
				$response.user.uid = $uid;													// carregaa a UID do usuario
			} )
			.catch ( ( $error ) => {														// caso haja erro
				//console.log ( "firebase.sgin.servive/SignInsertTable/$error: ", $error );	// imprime dados
				$response = Object.assign( $response, $error );								// passa o erro para a resposta
				$response.message = "Erro ao inserir usuario no banco de dados"; 			// altera o texto de erro										
			} )
			.finally ( ( ) => { 															// quando terminar
				$callback ( $response );													// chama o callback
			} );
		};

    };

} ) ( );