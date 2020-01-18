import { useDispatch, useSelector } from "react-redux";
import * as ROUTES from "../../constants/routes";
import React, { useState } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useInput } from "../../utils/useInput";
import { loginUser } from "../../actions";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  "@global": {
    body: {
      backgroundColor: "#fff"
    }
  },
  paper: {
    marginTop: 100,
    display: "flex",
    padding: 20,
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f50057"
  },
  form: {
    marginTop: 1
  },
  errorText: {
    color: "#f50057",
    marginBottom: 5,
    textAlign: "center"
  }
});

export default function SignInPage() {
  const hasUserSignedUp = useSelector(store => store.auth.isAuthenticated);
  if (hasUserSignedUp) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return <SignInForm />;
}

function SignInForm() {
  const email = useInput("");
  const password = useInput("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const backendError = useSelector(store => store.auth.error);
  const dispatch = useDispatch();

  const classes = useStyles();

  function handleSubmit(event) {
    if (!isValid()) return;

    event.preventDefault();
    const enteredEmail = email.value.trim();
    const enteredPassword = password.value;
    dispatch(loginUser(enteredEmail, enteredPassword));
  }

  function isValid() {
    return isEmailValid() && isPasswordValid();
  }

  function isEmailValid() {
    const { value } = email;
    return value.includes("@");
  }

  function isPasswordValid() {
    const { value } = password;
    return value.length >= 6;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email address"
          name="email"
          {...email.bind}
          onBlur={() => setEmailError(!isEmailValid())}
        />

        {emailError && (
          <Typography component="p" className={classes.errorText}>
            Enter valid email address.
          </Typography>
        )}

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password1"
          label="Password"
          type="password"
          id="password1"
          {...password.bind}
          onBlur={() => setPasswordError(!isPasswordValid())}
        />

        {passwordError && (
          <Typography component="p" className={classes.errorText}>
            Enter valid email address.
          </Typography>
        )}

        {backendError && (
          <Typography component="p" className={classes.errorText}>
            {backendError.message}
          </Typography>
        )}

        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={!isValid()}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </Paper>
      <Grid container justify="flex-end">
        <Grid item>
          <Link
            href="#"
            component={RouterLink}
            variant="body2"
            to={ROUTES.SIGN_UP}
          >
            Don't have an account? Sign up
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
