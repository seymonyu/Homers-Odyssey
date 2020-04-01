import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";

class SignIn extends Component {
  state = {
    email: "roelofjansijbring@hotmail.com",
    password: "iloveseyma",
    signed: false,
    flash: "",
    open: false
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

  handleSubmit = event => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    fetch("/auth/signin", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if (data.hasOwnProperty("user")) {
          this.setState({ signed: true });
          console.log(data.token);
        } else {
          this.setState({ flash: data.message });
          console.log(this.state.flash);
        }
      })
      .catch(err => this.setState({ flash: err.flash }));
    this.setState({ open: true });
  };
  handleClose() {
    this.setState({ open: false });
  }

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
