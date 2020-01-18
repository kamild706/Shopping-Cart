import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

function Landing() {
  return (
    <div>
      <h1>Witaj użytkowniku</h1>
      <Link to={ROUTES.SIGN_IN}>Zaloguj się</Link>
      <Link to={ROUTES.SIGN_UP}>Zarejestruj się</Link>
    </div>
  );
}

export default Landing;
