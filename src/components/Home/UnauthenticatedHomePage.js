import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import React from "react";

export default function UnauthenticatedHomePage() {
  return (
    <Container component="main" maxWidth="lg">
      <Typography component="h1" align="center" variant="h5">
        This app allows to maintain lists of products you want to buy.
      </Typography>
      <Typography component="h1" align="center" variant="h5">
        You need an account to use this site.
      </Typography>
      <div align="center">
        <Button
          component={RouterLink}
          variant="contained"
          color="primary"
          to={ROUTES.SIGN_IN}
        >
          Sign in
        </Button>
        <Button
          component={RouterLink}
          variant="contained"
          color="primary"
          to={ROUTES.SIGN_UP}
        >
          Sign up
        </Button>
      </div>
    </Container>
  );
}
