import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

export default function (ComposedComponent) {
  class NoAuthentication extends Component {
    componentWillMount() {
      if (this.props.authenticated) {
        console.log("I am at component did mount - no auth");
        this.props.history.push("/profile");
      }
    }
    componentWillUpdate() {
      if (this.props.authenticated) {
        console.log("I am at component did update - no auth");
        this.props.history.push("/profile");
      }
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return { authenticated: state.auth.token ? true : false };
  }

  return connect(mapStateToProps)(withRouter(NoAuthentication));
}
