import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { startRemoveSchedule } from "./actions/schedules";
import { Container } from "@material-ui/core";
import ViewSlots from "./ViewSlots";
import BookSlot from "./BookSlot";
import axios from "axios";
import ListUsers from "./listUsers";
import { Redirect } from "react-router-dom";
import Loading from "./Loading";

function SingleSchedule(props) {
  const [users, setusers] = useState([]);
  useEffect(() => {
    if (props.user.isAdmin && props.schedule) {
      const getusers = async () => {
        let data = await axios.get(
          `/api/schedules/${props.schedule._id}/users`,
          { withCredentials: true }
        );
        data = data.data.data.users;
        data = data.map(ele => ele.user).filter(ele => ele);
        setusers(data);
      };
      getusers();
    }
  }, [props.schedule]);
  const handleDelete = () => {
    props.dispatch(startRemoveSchedule(props.schedule._id, props.history));
  };
  const handleEdit = () => {
    props.history.push(`/schedules/${props.schedule._id}/edit`);
  };
  if (!props.user.email) {
    props.histroy.push("/");
  }
  if (!props.schedule) {
    return <Loading />;
  } else {
    return (
      <Container maxWidth="sm">
        {props.user.isAdmin && (
          <>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDelete}
            >
              delete
            </Button>
          </>
        )}
        {props.user.isAdmin ? (
          <ViewSlots schedule={props.schedule} />
        ) : (
          <BookSlot schedule={props.schedule} history={props.history} />
        )}
        {props.user.isAdmin && (
          <ListUsers scheduleId={props.schedule._id} users={users} />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    schedule: state.schedules.find(ele => ele._id === props.match.params.id),
    user: state.user
  };
};

export default connect(mapStateToProps)(SingleSchedule);
