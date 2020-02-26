import React from "react";
import bean from "./bean.svg";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <img src={bean} alt="loading" />
        <Typography variant="h2">Loading</Typography>
      </div>
    </div>
  );
}
