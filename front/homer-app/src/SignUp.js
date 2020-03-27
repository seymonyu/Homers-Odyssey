import React, { Component } from "react";

class SignUp extends Component {
  state = {
    email: "mon@email.com",
    password: "monPassw0rd",
    // passwordcon: "monPassw0rd",
    name: "James",
    lastname: "Bond",
    flash: ""
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
  handleSubmit = e => {
    e.preventdefault();
    fetch("/auth/signup", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(res => res.json())
      .then(res => this.setState({ flash: res.flash }))
      .catch(err => this.setState({ flash: err.flash }));
  };
  render() {
    return (
      <div>
        <h1>{JSON.stringify(this.state, 1, 1)}</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.updateEmailField} type="email" name="email" />
          <input
            onChange={this.updatePasswordField}
            type="text"
            name="password"
          />
          {/*  <input
            onChange={this.updatePasswordconField}
            type="text"
            name="passwordcon"
          /> */}
          <input onChange={this.updateNameField} type="text" name="name" />
          <input
            onChange={this.updateLastNameField}
            type="text"
            name="lastname"
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default SignUp;
