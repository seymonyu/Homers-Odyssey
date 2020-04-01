import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
class Profile extends Component {
  state = {
    profile: {
      email: "roelofjansijbring@hotmail.com",
      name: "iloveseyma",
      lastname: "Sijbring",
      signed: false
    }
  };

  handleSignout = event => {
    event.preventDefault();
    this.setState({
      signed: true
    });
  };

  render() {
    if (this.state.signed === true) {
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
          onClick={this.handleSignout}
        >
          Sign Out
        </Button>
      </div>
    );
  }
}

export default Profile;
