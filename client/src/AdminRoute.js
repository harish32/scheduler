import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import NotFound from "./NotFound";
import Loading from "./Loading";

function AdminRoute({
  component: Component,
  edit: edit,
  user: user,
  loading,
  ...rest
}) {
  if (loading) {
    return <Loading />;
  }
  return (
    <Route
      {...rest}
      render={props =>
        user.email ? (
          user.isAdmin ? (
            <Component edit={edit} {...props} />
          ) : (
            <NotFound />
          )
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

export default connect(mapStateToProps)(AdminRoute);
