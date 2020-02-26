import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import SelectBatch from "./SelectBatch";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import { alert } from "./actions/alerts";

const styles = {
  container: {
    margin: "auto auto",
    display: "flex",
    border: "2px solid black",
    width: "30%",
    marginTop: "10%",
    flexDirection: "column",
    padding: "3rem",
    borderRadius: "15px"
  }
};

class SwitchBatches extends Component {
  constructor(props) {
    super(props);
    this.state = { from: "", to: "", userId: "", users: [], disable: false };
  }
  setUsers = async () => {
    if (this.state.from) {
      const users = await axios.get(`/api/users?batchId=${this.state.from}`, {
        withCredentials: true
      });
      this.setState({ users: users.data.data });
    }
  };
  handleChange = e => {
    const { name } = e.target;
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        if (name === "from") {
          this.setUsers();
        }
      }
    );
  };
  checkvalid = () => {
    if (this.state.userId && this.state.from && this.state.to) {
      if (this.state.from !== this.state.to) {
        return true;
      }
      return false;
    }
    return false;
  };
  handleSubmit = async () => {
    try {
      if (this.checkvalid()) {
        const user = await axios.put(
          `/api/users/${this.state.userId}/batch/${this.state.to}`,
          {},
          { withCredentials: true }
        );
        this.setState({ from: "", to: "", userId: "", users: [] });
      }
    } catch (err) {
      alert("error", "Error", err.response.data.err);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <SelectBatch
          name={"from"}
          heading={"select batch"}
          handleChange={this.handleChange}
          options={this.props.batches}
          default={this.state.from}
        />
        <SelectBatch
          name={"userId"}
          heading={"select user"}
          handleChange={this.handleChange}
          options={this.state.users}
          default={this.state.userId}
        />
        <SelectBatch
          name={"to"}
          heading={"select new batch"}
          options={this.props.batches}
          handleChange={this.handleChange}
          default={this.state.to}
        />
        <Button
          onClick={this.handleSubmit}
          disabled={!this.checkvalid()}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { batches: state.batches };
};

export default connect(mapStateToProps)(withStyles(styles)(SwitchBatches));
