import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { useInput } from "../../utils/useInput";
import { useDispatch, useSelector } from "react-redux";
import { signUpUserWithEmailAndPassword } from "../../actions";
import * as ROUTES from "../../constants/routes";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

export default function SignUpPage() {
  const hasUserSignedUp = useSelector(store => store.auth.isAuthenticated);
  if (hasUserSignedUp) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return <SignUpForm />;
}

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

function SignUpForm() {
  const username = useInput("");
  const email = useInput("");
  const password1 = useInput("");
  const password2 = useInput("");

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const backendError = useSelector(store => store.auth.error);
  const dispatch = useDispatch();

  const classes = useStyles();

  function handleSubmit(event) {
    if (!isValid()) return;

    event.preventDefault();
    const enteredEmail = email.value.trim();
    const enteredPassword = password1.value;
    const enteredUsername = username.value.trim();
    dispatch(signUpUserWithEmailAndPassword(enteredEmail, enteredPassword, enteredUsername));
  }

  function isValid() {
    return isUsernameValid() && isEmailValid() && isPasswordValid();
  }

  function isUsernameValid() {
    const { value } = username;
    return value.trim().length >= 3;
  }

  function isEmailValid() {
    const { value } = email;
    return value.includes("@");
  }

  function isPasswordValid() {
    const { value: pass1 } = password1;
    const { value: pass2 } = password2;

    return pass1 === pass2 && pass1.length >= 6;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          name="username"
          {...username.bind}
          onBlur={() => setUsernameError(!isUsernameValid())}
        />

        {usernameError && (
          <Typography component="p" className={classes.errorText}>
            Username must have at least 3 chars.
          </Typography>
        )}

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
          {...password1.bind}
          onBlur={() => setPasswordError(!isPasswordValid())}
        />

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password2"
          label="Repeat password"
          type="password"
          id="password2"
          {...password2.bind}
          onBlur={() => setPasswordError(!isPasswordValid())}
        />

        {passwordError && (
          <Typography component="p" className={classes.errorText}>
            Passwords must match and have at least 6 chars
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
          Sign Up
        </Button>
      </Paper>
      <Grid container justify="flex-end">
        <Grid item>
          <Link
            href="#"
            component={RouterLink}
            variant="body2"
            to={ROUTES.SIGN_IN}
          >
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
