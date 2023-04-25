import queryString from "query-string";
import { useState } from "react";

import { useEffect } from "react";
import * as AuthService from "services/auth_service";

const LoginIgoss = () => {
  const ssoDomain: string = `${import.meta.env.VITE_ACC_BASE_URL}`;
  const redirectUri: string = `${import.meta.env.VITE_DOMAIN}/login`;
  const client_id: string = `${import.meta.env.VITE_SOLUTION_CODE}`;
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log(client_id, redirectUri, ssoDomain);

    let rparams = queryString.parse(window.location.search);

    var code = rparams["code"];

    var networkId: any = rparams["networkId"];

    AuthService.loginIgoss(code, networkId).then((resp) => {
      if (resp.Success) {
        localStorage.setItem("token", resp.Data.AccessToken);

        window.location.href = `/${networkId ? networkId : ""}`;
        //window.location.href ='/'
      } else {
        //toast.error(resp.ErrorMessage);
        setErrorMessage(resp.ErrorMessage);
      }
    });
  }, []);

  return (
    <>
      {errorMessage != "" ? (
        <strong>{errorMessage}</strong>
      ) : (
        <strong>Logging in...</strong>
      )}
    </>
  );
};

export default LoginIgoss;
