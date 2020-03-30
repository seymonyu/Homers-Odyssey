import React from "react";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Profile from "./components/Profile/Profile";
import { Switch, Route } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import "./App.css";

function App() {
  return (
    <div>
      <MuiThemeProvider>
        <Grid container alignItems="center" style={{ height: "100%" }}>
          <Grid item xs={12}>
            <Paper elevation={4} style={{ margin: 32 }}>
              <Grid container alignItems="center" justify="center">
                <Grid item xs={12} sm={6} style={{ "text-align": "center" }}>
                  <img
                    src="http://images.innoveduc.fr/react_odyssey_homer/wildhomer.png"
                    alt="homer"
                  />
                </Grid>
                <Grid item xs={12} sm={6} alignContent="center">
                  <Switch>
                    <Route exact path="/" component={SignIn} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/profile" component={Profile} />
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
