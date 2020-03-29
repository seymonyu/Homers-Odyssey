import React, { Component } from "react";
import "./signup.css";
import { Button, TextField, Snackbar } from "@material-ui/core";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    // passwordcon: "monPassw0rd",
    name: "",
    lastname: "",
    flash: "",
    open: false
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
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div className="signup-cont">
        <h1>Sign Up Here</h1>
        <form className="submit-form">
          <TextField
            onChange={this.updateEmailField}
            type="email"
            name="email"
          />
          <TextField
            onChange={this.updatePasswordField}
            type="text"
            name="password"
          />
          {/*  <input
            onChange={this.updatePasswordconField}
            type="text"
            name="passwordcon"
          /> */}
          <TextField onChange={this.updateNameField} type="text" name="name" />
          <TextField
            onChange={this.updateLastNameField}
            type="text"
            name="lastname"
          />

          {/*  <input type="submit" value="submit" /> */}
          <Button className="button-submit" onClick={this.handleSubmit}>
            Submit!
          </Button>

          <Snackbar
            open={this.state.open}
            onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{this.state.flash}</span>}
          />
        </form>
      </div>
    );
  }
}
export default SignUp;
