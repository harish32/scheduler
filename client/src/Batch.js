import React, { Component } from "react";
import axios from "axios";
import NewBatch from "./newbatch";
import User from "./user";
import { connect } from "react-redux";
import Loading from "./Loading";
import { Button, Typograpy, Typography, withStyles } from "@material-ui/core";

const styles = {
  heading: {
    textAlign: "center",
    padding: "1rem",
    margin: "1rem"
  },
  users: {
    display: "flex",
    margin: "1rem"
  },
  btn: {
    marginTop: "1rem"
  }
};

class Batch extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, batch: "", disable: false };
  }
  handleEdit = () => {
    this.setState({ isEditing: true });
  };
  blockUser = async id => {
    const user = await axios.put(
      `/api/users/${id}/block`,
      {},
      {
        withCredentials: true
      }
    );
    if (user.data.success) {
      this.setState(st => ({
        batch: {
          ...st.batch,
          users: st.batch.users.map(ele => {
            if (ele._id.toString() === id) {
              return { ...ele, blocked: user.data.blocked };
            }
            return ele;
          })
        },
        disable: false
      }));
    }
  };
  handleBlock = async id => {
    this.setState({ disable: true }, () => this.blockUser(id));
  };
  async componentDidMount() {
    if (this.props.user && this.props.user.isAdmin) {
      const batch = await axios.get(
        `/api/batches/${this.props.match.params.id}`,
        { withCredentials: true }
      );
      this.setState({ batch: batch.data.data });
    }
  }
  render() {
    if (!this.state.batch) {
      return <Loading />;
    }
    const { classes } = this.props;
    return (
      <div>
        {!this.state.isEditing ? (
          <>
            {" "}
            {this.state.batch && (
              <>
                <div className={classes.heading}>
                  <Typography variant="h4">{this.state.batch.name}</Typography>
                  <Button
                    className={classes.btn}
                    color="primary"
                    variant="outlined"
                    onClick={this.handleEdit}
                  >
                    edit
                  </Button>
                </div>
                <div className={classes.users}>
                  {this.state.batch.users.map(ele => (
                    <User
                      show={false}
                      key={ele._id}
                      blockUser={this.handleBlock}
                      disable={this.state.disable}
                      {...ele}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <NewBatch
            batch={this.state.batch}
            blockUser={this.handleBlock}
            disable={this.state.disable}
            history={this.props.history}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Batch));
