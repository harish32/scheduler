import React from "react";
import { makeStyles } from "@material-ui/core";
import back from "./schedule.jpeg";

const styles = makeStyles({
  dash: {
    height: "91.9vh",
    overflowY: "hidden !important",
    padding: "0",
    margin: "0",
    backgroundImage: `url(${back})`,
    backgroundOrigin: "center",
    backgroundPosition: "center",
    backgroundSize: "auto"
  }
});

function Dashboard(props) {
  const classes = styles();
  return <div className={classes.dash}></div>;
}

export default Dashboard;
