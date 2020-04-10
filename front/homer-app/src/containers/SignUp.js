import React, { Component } from "react";
import { Button, TextField, SnackbarContent } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import "../stylesheets/signup.css";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    lastname: "",
    flash: "",
    open: false,
  };

  updateEmailField = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  updateNameField = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  updateLastNameField = (event) => {
    this.setState({
      lastname: event.target.value,
    });
  };
  updatePasswordField = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  /*  updatePasswordconField = event => {
    this.setState({
      passwordcon: event.target.value
    });
  }; */
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ signup: true });
    fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((res) => this.setState({ flash: res.flash }))
      .catch((err) => this.setState({ flash: err.flash }));
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    if (this.state.open === true) {
      return <Redirect to="/profile" />;
    }
    return (
      <div className="signup-cont">
        <h1>Sign Up Here</h1>
        <Link
          to="/signin"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          Have an account?
          <br />
          Sign In
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
            label="name"
            type="text"
            name="name"
            onChange={this.updateNameField}
          />
          <TextField
            label="lastname"
            type="text"
            name="lastname"
            onChange={this.updateLastNameField}
          />

          <Button
            className="button-submit"
            color="secondary"
            variant="contained"
            onClick={this.handleSubmit}
          >
            Submit!
          </Button>

          <SnackbarContent
            className="snackbar"
            open={this.state.open}
            onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "message-id",
            }}
            message={<span id="message-id">{this.state.flash}</span>}
          />
        </form>
      </div>
    );
  }
}

export default SignUp;
