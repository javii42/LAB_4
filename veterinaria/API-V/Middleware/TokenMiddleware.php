<?php
    class TokenMiddleware{
        ///Valida el token.
        public static function ValidarToken($request,$response,$next){
            $token = $request->getHeader("Authorization");
            $validacionToken = Token::DecodificarToken($token[0]);
            if($validacionToken["Estado"] == "OK"){
                $request = $request->withAttribute("payload", $validacionToken);
                return $next($request,$response);
            }
            else{
                $newResponse = $response->withJson($validacionToken,401);
                return $newResponse;
            }
        }
    }
?>