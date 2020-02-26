import React from "react";
import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import moment from "moment";

function Profile(props) {
  if (!props.user.email) {
    return <Redirect to="/user/login" />;
  }
  return (
    <Container>
      {props.user.email ? (
        <>
          <h4>email:{props.user.email}</h4>
          <h4>reset password</h4>
          <h4>upcoming schedules</h4>
          {props.user.schedules.map(ele => (
            <li key={ele._id}>
              <span>{ele.title}</span>
              {ele.selected ? (
                <span>
                  {moment(ele.from)
                    .utcOffset("+5:30")
                    .format("DD/MM/YY  HH:mm")}
                  to{" "}
                  {moment(ele.to)
                    .utcOffset("+5:30")
                    .format("HH:mm")}
                </span>
              ) : (
                <span>NA</span>
              )}
            </li>
          ))}
        </>
      ) : (
        <h1>loading</h1>
      )}
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Profile);
