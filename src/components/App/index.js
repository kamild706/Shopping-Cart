import React from "react";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import HomePage from "../Home";
import * as ROUTES from "../../constants/routes";
import configureStore from "../../configureStore";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import history from "../../history";
import { makeStyles } from "@material-ui/core";
import AppbarDrawer from "../AppbarDrawer";
import ShoppingLists from "../ShoppingLists";

const store = configureStore();
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  }
}));

function App() {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <Router history={history}>
        <div className={classes.root}>
          <AppbarDrawer />
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <Route exact path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.SHOPPING_LISTS} component={ShoppingLists} />
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
