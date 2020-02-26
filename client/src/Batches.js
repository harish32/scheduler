import React from "react";
import BatchCard from "./BatchCard";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    margin: "5rem"
  }
});

function Batches(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.batches.map(ele => (
        <BatchCard key={ele._id} batch={ele} />
      ))}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    batches: state.batches
  };
};

export default connect(mapStateToProps)(Batches);
