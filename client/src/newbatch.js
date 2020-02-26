import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import UserForm from "./UserForm";
import User from "./user";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";
import { startAddbatch, startUpdatebatch } from "./actions/batches";
import { alert, confirmAlert } from "./actions/alerts";
import { startAddUsers, startDeleteUser } from "./actions/users";
import { Redirect } from "react-router-dom";

const styles = {
  users: {
    display: "flex",
    flexWrap: "wrap"
  },
  forms: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  batchform: {
    marginBottom: "1rem"
  },
  btn: {
    marginTop: "1rem",
    marginLeft: "1rem"
  }
};

class NewBatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      users: [],
      old: false,
      editingUser: { name: "", mobile: "", email: "", _id: "" },
      editing: false
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.old) {
      this.setState({ old: false });
      if (this.state.name !== this.props.batch.name) {
        this.props.dispatch(
          startUpdatebatch(this.props.batch._id, { name: this.state.name })
        );
      }
      alert("success", "success", "batch updated successfully");
    } else {
      const found = this.props.batches.find(
        ele => ele.name === this.state.name
      );
      if (found) {
        alert("error", "error", "name must be unique");
      } else {
        await this.props.dispatch(
          startAddbatch({
            name: this.state.name
          })
        );
        const batchId = this.props.batches[this.props.batches.length - 1]._id;
        const data = this.state.users.map(ele => {
          return { ...ele, batchId };
        });
        this.props.dispatch(startAddUsers(data));
      }
    }
    this.props.history.push("/batches/view");
  };
  addUser = user => {
    this.setState(st => ({
      users: [...st.users, user]
    }));
    if (this.state.old) {
      this.props.dispatch(
        startAddUsers([{ ...user, batchId: this.props.batch._id }])
      );
    }
  };
  removeUser = async id => {
    const confirm = await confirmAlert(
      "do you really want to delete this user"
    );
    if (confirm.value) {
      this.setState(st => ({
        users: st.users.filter(ele => ele._id !== id)
      }));
      if (this.state.old) {
        this.props.dispatch(startDeleteUser(id));
      }
    }
  };
  updateUser = async (id, data) => {
    if (this.state.old) {
      await axios.put(`/api/users/${id}`, data, {
        withCredentials: true
      });
    }
    this.setState(st => ({
      users: st.users.map(ele => {
        if (ele._id.toString() === id) {
          return { ...ele, ...data };
        }
        return ele;
      })
    }));
  };
  setedit = id => {
    const user = this.state.users.find(ele => ele._id.toString() === id);
    this.setState({
      editingUser: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        _id: user._id
      },
      editing: true
    });
  };
  async componentDidMount() {
    if (this.props.batch) {
      this.setState({
        name: this.props.batch.name,
        users: this.props.batch.users,
        old: true
      });
    }
  }
  render() {
    if (!this.props.user.email && !this.props.user.isAdmin) {
      return <Redirect to="/user/login" />;
    }
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.forms}>
          <ValidatorForm
            className={classes.batchform}
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >
            <TextValidator
              label="BatchName"
              onChange={this.handleChange}
              name="name"
              gutterbottom
              value={this.state.name}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <Button
              size="small"
              className={classes.btn}
              variant="outlined"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </ValidatorForm>
          <div>
            <UserForm
              addUser={this.addUser}
              edit={this.state.editing}
              user={this.state.editingUser}
              updateUser={this.updateUser}
            />
          </div>
        </div>
        <div className={this.props.classes.users}>
          {this.state.users.map(ele => (
            <User
              key={ele._id}
              {...ele}
              setedit={this.setedit}
              show={true}
              remove={this.removeUser}
            />
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    batches: state.batches,
    user: state.user
  };
};

export default connect(mapStateToProps)(withStyles(styles)(NewBatch));
