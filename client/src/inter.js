import React, { Component } from "react";
import Schedule from "./Schedule"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { schedule: [], days: 0 };
    this.addSchedule = this.addSchedule.bind(this)
  }
  addSchedule(Schedule){
    console.log(Schedule)
    this.setState(st=>({
      schedule:[...st.schedule,Schedule]
    }))
  }

  render() {
    return (
      <div>
        <Schedule addSchedule={this.addSchedule} />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react'
import "./App.css";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker"
import {
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export class Schedule extends Component {
    constructor(props){
        super(props)
        this.state={date:new Date(),slots:[]}
    }
    addSlots = (slot)=>{
        this.setState(st=>({
            slots:[...st.slots,slot]
        }))
    }
    changeDate=date=>{
        this.setState({date})
    }
    handleSubmit=()=>{
        this.props.addSchedule({date:this.state.date,slots:this.state.slots})
    }
    render() {
        return (
            <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker date={this.state.date} changeDate={this.changeDate} />
                    <TimePicker date={this.state.date} addSlot={this.addSlots} />
                </MuiPickersUtilsProvider>
                <button onClick={this.handleSubmit} >submit</button>
            </div>
        )
    }
}

export default Schedule
