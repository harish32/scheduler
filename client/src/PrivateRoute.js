import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "./Loading";

function PrivateRoute({ component: Component, user: user, loading, ...rest }) {
  if (loading) {
    return <Loading />;
  }
  return (
    <Route
      {...rest}
      render={props =>
        user.email ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/user/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    loading: state.loading
  };
};

export default connect(mapStateToProps)(PrivateRoute);
