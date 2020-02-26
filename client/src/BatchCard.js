import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { startDeleteBatch } from "./actions/batches";

const useStyles = makeStyles({
  card: {
    width: "300px",
    margin: "1rem"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  pos: {
    marginBottom: 12
  }
});

function BatchCard({ batch, history, dispatch }) {
  const classes = useStyles();
  const handleDelete = () => {
    dispatch(startDeleteBatch(batch._id));
  };
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} variant="h6" gutterBottom>
          {batch.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => history.push(`/batches/view/${batch._id}`)}
          size="small"
        >
          view
        </Button>
        <Button onClick={() => handleDelete()} size="small">
          Delete Batch
        </Button>
      </CardActions>
    </Card>
  );
}

export default connect()(withRouter(BatchCard));
