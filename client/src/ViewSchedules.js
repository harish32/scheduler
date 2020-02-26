import React from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const random = () => {
  return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, 1)`;
};

const useStyles = makeStyles(theme => ({
  title: {
    padding: "2rem",
    "& a": {
      textDecoration: "none",
      color: "black"
    },
    width: "200px",
    margin: "1rem"
  },
  container: {
    padding: "2rem",
    display: "flex",
    flexWrap: "wrap"
  }
}));

function ViewSchedules(props) {
  const classes = useStyles();
  if (!props.user.email) {
    return <Redirect to="/login" />;
  }
  return (
    <div className={classes.container}>
      {props.schedules.length === 0 && <h2>no schedules available</h2>}
      {props.schedules.map(ele => (
        <div
          key={ele._id}
          style={{ backgroundColor: random() }}
          className={classes.title}
        >
          <Link to={`/schedules/${ele._id}`}>{ele.title}</Link>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    schedules: state.schedules,
    user: state.user
  };
};

export default connect(mapStateToProps)(ViewSchedules);
