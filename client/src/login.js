import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import useInputState from "./hooks/useInputState";
import { startGetUser } from "./actions/users";
import { connect } from "react-redux";

const styles = makeStyles({
  login: {
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& input": {
      padding: "5px",
      borderRadius: "5px",
      border: "2px solid #ccc",
      outline: "none"
    }
  },
  form: {
    "& input": {
      margin: "1rem",
      textAlign: "center"
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});

function Login(props) {
  const [email, handleEmailChange] = useInputState("");
  const [password, handlePassChange] = useInputState("");
  const handleSubmit = e => {
    e.preventDefault();
    props.dispatch(startGetUser({ email, password }, props));
  };
  const classes = styles();
  // if (props.user.email) {
  //   const loc = props.location.state ?
  // }
  return (
    <div className={classes.login}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            onChange={handleEmailChange}
            value={email}
            required={true}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            value={password}
            type="password"
            onChange={handlePassChange}
            required={true}
          />
        </div>
        <Button variant="outlined" color="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Login);
