import React from "react";
import SignUp from "./containers/SignUp";
import SignIn from "./containers/SignIn";
import Profile from "./containers/Profile";
import { Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import Authentication from "./hoc/requireAuth";
import NoAuthentication from "./hoc/requireNotAuth";

import "./App.css";
const theme = createMuiTheme();
function App() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Grid
          container
          alignItems="center"
          alignContent="center"
          style={{ height: "100%" }}
        >
          <Grid item xs={12}>
            <Paper elevation={4} style={{ margin: 32 }}>
              <Grid container alignItems="center" justify="center">
                <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
                  <img
                    src="http://images.innoveduc.fr/react_odyssey_homer/wildhomer.png"
                    alt="homer"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Switch>
                    <Redirect exact from="/" to="/profile" />
                    <Route
                      exact
                      path="/profile"
                      component={Authentication(Profile)}
                    />
                    <Route
                      exact
                      path="/signin"
                      component={NoAuthentication(SignIn)}
                    />
                    <Route
                      exact
                      path="/signup"
                      component={NoAuthentication(SignUp)}
                    />
                  </Switch>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
