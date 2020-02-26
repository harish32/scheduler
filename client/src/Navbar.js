import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  a: {
    textDecoration: "none",
    fontSize: "1.2rem",
    marginRight: "1rem",
    color: "white",
    textTransform: "uppercase"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.a}>
              Dashboard
            </Link>
          </Typography>
          {props.user.isAdmin ? (
            <>
              <Link to="/schedules" className={classes.a}>
                schedules
              </Link>
              <Link to="/batches/view" className={classes.a}>
                view batches
              </Link>
              <Link to="/schedules/add" className={classes.a}>
                add schedule
              </Link>
              <Link to="/batches/add" className={classes.a}>
                add Batch
              </Link>
              <Link to="/slot" className={classes.a}>
                Allot a Slot
              </Link>
              <Link to="/switchbatches" className={classes.a}>
                Switch Batch
              </Link>
            </>
          ) : (
            <>
              {props.user.email && (
                <>
                  <Link to="/bookslot" className={classes.a}>
                    Book a slot
                  </Link>
                  <Link to="/profile" className={classes.a}>
                    My profile
                  </Link>
                </>
              )}
            </>
          )}

          {props.user.email ? (
            <Link to="/user/logout" className={classes.a}>
              Logout
            </Link>
          ) : (
            <Link to="/user/login" className={classes.a}>
              Login
            </Link>
          )}
        </Toolbar>
      </AppBar>
      {props.children}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(ButtonAppBar);
