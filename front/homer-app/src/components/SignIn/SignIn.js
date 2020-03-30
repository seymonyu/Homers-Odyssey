import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, TextField, SnackbarContent } from "@material-ui/core";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    passwordcon: "",
    signed: false
  };

  updateEmailField = event => {
    this.setState({
      email: event.target.value
    });
  };

  updatePasswordField = event => {
    this.setState({
      password: event.target.value
    });
  };
  updatePasswordconField = event => {
    this.setState({
      passwordcon: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.setState({ signed: true });
    /*    fetch("http://localhost:5000/auth/signin", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(res => this.setState({ flash: res.flash }))
      .catch(err => this.setState({ flash: err.flash })); */
  };

  render() {
    if (this.state.signed === true) {
      return <Redirect to="/profile" />;
    }
    return (
      <div className="signup-cont">
        <h1>Sign In</h1>
        <Link
          to="/signup"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          or Sign Up
        </Link>
        <form className="submit-form">
          <TextField
            label="email"
            type="email"
            name="email"
            onChange={this.updateEmailField}
          />
          <TextField
            label="password"
            type="text"
            name="password"
            onChange={this.updatePasswordField}
          />

          <TextField
            label="passwordcon"
            type="text"
            name="passwordcon"
            onChange={this.updatePasswordconField}
          />

          <Button
            color="secondary"
            variant="contained"
            className="button-submit"
            onClick={this.handleSubmit}
          >
            Submit!
          </Button>
        </form>
      </div>
    );
  }
}
export default SignIn;
