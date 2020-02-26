import React, { Component } from "react";
import DaySchedule from "./DaySchedule";
import SelectBatch from "./SelectBatch";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import moment from "moment";
import objectid from "bson-objectid";
import { submitSchedule, startUpdateSchedule } from "./actions/schedules";
import { connect } from "react-redux";

const styles = {
  schedule: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    width: "500px",
    justifyContent: "flex-end",
    margin: "auto auto"
  },
  btn: {
    marginTop: "2rem"
  },
  title: {
    padding: "5px",
    borderRadius: "5px",
    border: "2px solid #ccc",
    outline: "none"
  }
};

class AddSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slots: [],
      title: "",
      batchId: "",
      batches: props.batches,
      isEditing: false,
      scheduleId: ""
    };
  }
  addDay = () => {
    let id = objectid();
    id = id.str;
    this.setState(st => ({
      slots: [
        ...st.slots,
        {
          _id: id,
          date: moment(),
          timeSlots: []
        }
      ]
    }));
  };
  deleteDay = id => {
    console.log(id);
    this.setState(st => ({
      slots: st.slots.filter(ele => ele._id !== id)
    }));
  };

  submitSchedule = async () => {
    if (this.state.isEditing) {
      this.props.dispatch(
        startUpdateSchedule(this.state.scheduleId, {
          batchId: this.state.batchId,
          title: this.state.title,
          slots: this.state.slots
        })
      );
    } else {
      this.props.dispatch(
        submitSchedule({
          batchId: this.state.batchId,
          title: this.state.title,
          slots: this.state.slots
        })
      );
    }

    this.props.history.push("/");
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleDateChange = (val, id) => {
    this.setState(st => ({
      slots: st.slots.map(ele => {
        if (ele._id === id) {
          return { ...ele, date: moment(val).format("YYYY-MM-DD") };
        }
        return ele;
      })
    }));
  };
  addTimeSlot = id => {
    this.setState(st => ({
      slots: st.slots.map(ele => {
        if (ele._id === id) {
          return {
            ...ele,
            timeSlots: [
              ...ele.timeSlots,
              {
                from: moment()
                  .hour(8)
                  .minute(0)
                  .format("HH:mm"),
                end: moment()
                  .hour(11)
                  .minute(0)
                  .format("HH:mm"),
                count: 1,
                _id: objectid().str,
                total: 1
              }
            ]
          };
        }
        return ele;
      })
    }));
  };

  changeTimeSlot = (id, slotid, val, type) => {
    this.setState(st => ({
      slots: st.slots.map(ele => {
        if (ele._id === id) {
          return {
            ...ele,
            timeSlots: ele.timeSlots.map(ele => {
              if (ele._id === slotid) {
                return { ...ele, [type]: moment(val).format("HH:mm") };
              }
              return ele;
            })
          };
        }
        return ele;
      })
    }));
  };
  changeSlotCount = (id, slotid, val) => {
    this.setState(st => ({
      slots: st.slots.map(ele => {
        if (ele._id === id) {
          return {
            ...ele,
            timeSlots: ele.timeSlots.map(ele => {
              if (ele._id === slotid) {
                return { ...ele, count: Number(val), total: Number(val) };
              }
              return ele;
            })
          };
        }
        return ele;
      })
    }));
  };
  removeSlot = (id, slotid) => {
    this.setState(st => ({
      slots: st.slots.map(ele => {
        if (ele._id === id) {
          return {
            ...ele,
            timeSlots: ele.timeSlots.filter(ele => ele._id !== slotid)
          };
        }
        return ele;
      })
    }));
  };
  async componentDidMount() {
    if (this.props.edit) {
      const schedule = this.props.schedules.find(
        ele => ele._id === this.props.match.params.id
      );
      this.setState({
        isEditing: true,
        batchId: schedule.batchId,
        slots: schedule.slots,
        title: schedule.title,
        scheduleId: schedule._id
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.schedule}>
        <h1>{this.state.isEditing ? "Edit Schedule" : "Add Schedule"}</h1>
        <input
          className={classes.title}
          placeholder="enter title"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <SelectBatch
          default={this.state.batchId}
          handleChange={this.handleChange}
          options={this.props.batches}
          heading={"Select Batch"}
          name={"batchId"}
        />
        {this.state.slots.map(ele => (
          <DaySchedule
            removeTimeSlot={this.removeSlot}
            changeCount={this.changeSlotCount}
            addTimeSlot={this.addTimeSlot}
            key={ele._id}
            handleChange={this.handleDateChange}
            changeTimeSlot={this.changeTimeSlot}
            {...ele}
            delete={this.deleteDay}
          />
        ))}
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={this.addDay}
        >
          addDay
        </Button>
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={this.submitSchedule}
        >
          submit Schedule
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    batches: state.batches,
    schedules: state.schedules
  };
};

export default connect(mapStateToProps)(withStyles(styles)(AddSchedule));
