import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
class Profile extends Component {
  state = {
    profile: {
      email: "",
      name: "",
      lastname: "",
    },
    signin: false,
  };
  componentDidMount() {
    if (this.props.token) {
      fetch("/auth/profile", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.props.token,
        },
      })
        .then((res) => {
          if (res.ok) return res.json();
          else throw new Error(res.statusText);
        })
        .then((res) => {
          this.setState({ profile: res });
        })
        .catch();
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      signin: true,
    });
  };

  render() {
    if (this.state.signin === true) {
      return <Redirect to="/signin" />;
    }
    return (
      <div>
        <List>
          <ListItem>
            <ListItemText
              primary={this.state.profile.email}
              secondary="my email"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={this.state.profile.name}
              secondary="my name"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={this.state.profile.lastname}
              secondary="my lastname"
            />
          </ListItem>
        </List>
        <Button
          color="secondary"
          variant="contained"
          className="signin-button"
          value="submit"
          onClick={this.handleSubmit}
        >
          Sign Out
        </Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { token: state.auth.token };
};

export default connect(mapStateToProps)(Profile);
