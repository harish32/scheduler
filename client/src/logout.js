import React, { useEffect } from "react";
import { connect } from "react-redux";
import { startRemoveUser } from "./actions/users";
import { resetBatches } from "./actions/batches";
import { resetSchedules } from "./actions/schedules";
import { Redirect } from "react-router-dom";

function Logout(props) {
  useEffect(() => {
    props.dispatch(startRemoveUser());
    props.dispatch(resetBatches());
    props.dispatch(resetSchedules());
  });
  return <Redirect to="/" />;
}

export default connect()(Logout);
