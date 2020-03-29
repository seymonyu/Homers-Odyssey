import React, { Component } from "react";
import "./signup.css";
import { Button, TextField, SnackbarContent } from "@material-ui/core";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    // passwordcon: "monPassw0rd",
    name: "",
    lastname: "",
    flash: ""
    /*  open: false */
  };

  updateEmailField = event => {
    this.setState({
      email: event.target.value
    });
  };

  updateNameField = event => {
    this.setState({
      name: event.target.value
    });
  };
  updateLastNameField = event => {
    this.setState({
      lastname: event.target.value
    });
  };
  updatePasswordField = event => {
    this.setState({
      password: event.target.value
    });
  };
  /*  updatePasswordconField = event => {
    this.setState({
      passwordcon: event.target.value
    });
  }; */
  handleSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(res => this.setState({ flash: res.flash }))
      .catch(err => this.setState({ flash: err.flash }));
    this.setState({ open: true });
  };
  /*  handleClose = () => {
    this.setState({ open: false });
  }; */
  render() {
    return (
      <div className="signup-cont">
        {/*   <h1>Sign Up Here</h1> */}
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
          <Button className="button-submit" onClick={this.handleSubmit}>
            Submit!
          </Button>
        </form>
        <SnackbarContent
          className="snackbar"
          /* open={this.state.open}*/
          onClose={this.handleClose}
          anchorOrigin={"bottom, center"}
          message={<span id="message-id">{this.state.flash}</span>}
        />
      </div>
    );
  }
}
export default SignUp;
