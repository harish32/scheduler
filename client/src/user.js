import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    width: "300px",
    margin: "2rem"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

function User({
  email,
  mobile,
  name,
  _id,
  remove,
  show,
  setedit,
  blocked,
  blockUser,
  disable
}) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {email}
        </Typography>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {mobile}
        </Typography>
      </CardContent>
      <CardActions>
        {show ? (
          <Button onClick={() => remove(_id)} size="small">
            delete
          </Button>
        ) : (
          ""
        )}
        {show ? (
          <Button onClick={() => setedit(_id)} size="small">
            edit
          </Button>
        ) : (
          ""
        )}
        {!show && (
          <>
            {blocked ? (
              <Button
                onClick={() => blockUser(_id)}
                disabled={disable}
                size="small"
              >
                unblock
              </Button>
            ) : (
              <Button
                onClick={() => blockUser(_id)}
                disabled={disable}
                size="small"
              >
                block
              </Button>
            )}
          </>
        )}
      </CardActions>
    </Card>
  );
}

export default User;
