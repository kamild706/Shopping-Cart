import firebase from "../components/Firebase";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from "../constants/actionTypes";
import history from "../history";
import * as ROUTES from "../constants/routes";

const requestSignUp = () => ({
  type: SIGN_UP_REQUEST
});

const receiveSignUp = credential => ({
  type: SIGN_UP_SUCCESS,
  credential
});

const signUpError = error => ({
  type: SIGN_UP_FAILURE,
  error
});

const requestLogin = () => ({
  type: LOGIN_REQUEST
});

const receiveLogin = credential => ({
  type: LOGIN_SUCCESS,
  credential
});

const loginError = error => ({
  type: LOGIN_FAILURE,
  error
});

const requestLogout = () => ({
  type: LOGOUT_REQUEST
});

const receiveLogout = () => ({
  type: LOGOUT_SUCCESS
});

const logoutError = error => ({
  type: LOGOUT_FAILURE,
  error
});

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  };
};

const updateUsername = username => {
  const user = firebase.auth.currentUser;
  return user.updateProfile({
    displayName: username
  });
};

export const signUpUserWithEmailAndPassword = (email, password, username) => dispatch => {
  dispatch(requestSignUp());
  firebase.createUserWithEmailAndPassword(email, password).then(
    user => {
      updateUsername(username);
      dispatch(receiveSignUp(user))
    },
    error => dispatch(signUpError(error))
  );
};

export const loginUser = (email, password) => dispatch => {
  dispatch(requestLogin());
  firebase.signInWithEmailAndPassword(email, password).then(
    user => dispatch(receiveLogin(user)),
    error => dispatch(loginError(error))
  );
};

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  firebase.signOut().then(
    () => {
      history.push(ROUTES.HOME);
      dispatch(receiveLogout());
    },
    error => dispatch(logoutError(error))
  );
};

export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest());

  firebase.auth.onAuthStateChanged(user => {
    if (user) {
      dispatch(receiveLogin(user));
    } else {
      dispatch(logoutUser());
    }
    dispatch(verifySuccess());
  });
};
