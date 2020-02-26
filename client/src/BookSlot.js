import React, { Component } from "react";
import { connect } from "react-redux";
// import { watchSchedule } from "./actions/schedules";
import {
  Button,
  Divider,
  withStyles,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import moment from "moment";
import { startBookSlot } from "./actions/users";

const styles = {
  slots: {
    display: "flex",
    flexWrap: "wrap"
  },
  slot: {
    padding: "1rem",
    margin: "2rem",
    display: "inline-block"
  }
};

export class BookSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleId: props.schedule._id,
      slotId: "",
      timeSlotId: "",
      from: "",
      to: "",
      dialog: false
    };
  }
  closeDialog = () => {
    this.setState({ dialog: false });
  };

  openDialog = () => {
    this.setState({ dialog: true });
  };
  submitSlot = () => {
    const slot = this.props.schedule.slots.find(
      ele => ele._id === this.state.slotId
    );
    const timeSlot = slot.timeSlots.find(
      ele => ele._id === this.state.timeSlotId
    );
    const position = timeSlot.total - timeSlot.count + 1;
    const data = {
      scheduleId: this.state.scheduleId,
      timeslotId: this.state.timeSlotId,
      slotId: this.state.slotId,
      from: this.state.from,
      to: this.state.to,
      position
    };
    this.props.dispatch(startBookSlot(data));
    this.props.history.push("/");
  };
  handleClick = (ele, slot) => {
    this.setState(
      {
        from: moment(ele.date.split("T")[0] + "T" + slot.from).utcOffset(
          "+5:30"
        ),
        to: moment(ele.date.split("T")[0] + "T" + slot.end).utcOffset("+5:30"),
        slotId: ele._id,
        timeSlotId: slot._id
      },
      this.openDialog
    );
  };
  // componentDidMount() {
  //   this.props.dispatch(watchSchedule(this.props.schedule._id));
  // }
  render() {
    const { classes } = this.props;
    return (
      <>
        {this.props.schedule.slots.map(ele => (
          <div key={ele._id}>
            <h3>{ele.date.split("T")[0]}</h3>
            <ul className={classes.slots}>
              {ele.timeSlots.map(slot => (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.handleClick(ele, slot)}
                  disabled={slot.count > 0 ? false : true}
                  key={slot._id}
                  className={classes.slot}
                >
                  {slot.from}-{slot.end}
                </Button>
              ))}
            </ul>
            <Divider />
          </div>
        ))}
        <Dialog
          open={this.state.dialog}
          onClose={this.closeDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
          <DialogContent>
            <DialogContentText>
              are you sure you want to select this slot {this.state.from._i} to{" "}
              {this.state.to._i} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.submitSlot} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default connect()(withStyles(styles)(BookSlot));
