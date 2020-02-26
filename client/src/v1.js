//addschedule
import React, { Component } from "react"
import DaySchedule from "./DaySchedule"
import uuid from "uuid/v4";
import  SelectBatch from "./SelectBatch"
import axios from "axios"
import {withStyles} from "@material-ui/core"
import Button from '@material-ui/core/Button';

const styles = {
    schedule:{
        textAlign:"center",
        display:"flex",
        flexDirection:"column",
        width:"500px",
        justifyContent:"flex-end",
        margin:"auto auto"
    },
    btn:{
        marginTop:"2rem"
    },
    title:{
        padding:"5px",
        borderRadius: "5px",
        border:"2px solid #ccc",
        outline:"none"
    }
}

class AddSchedule extends Component{
    constructor(props){
        super(props)
        this.state = {schedules:[],title:"",batchId:"",batches:[]}
    }
    addDay = ()=>{
        this.setState(st=>({
            schedules:[...st.schedules,{id:uuid(),slots:[]}]
        }))
    }
    deleteDay=(id)=>{
        this.setState(st=>({
            schedules:st.schedules.filter((ele)=>ele.id!==id)
        }))
    }
    submitDay=(id,day)=>{
        this.setState(st=>({
            schedules:st.schedules.map(ele=>{
                if(ele.id===id){
                    return {...ele,slots:day}
                }
                return ele
            })
        }))
    }
    submitSchedule = async ()=>{
        const slots = []
        this.state.schedules.forEach(ele=>{
            slots.push(...ele.slots)
        })
        console.log({batchId:this.state.batchId,title:this.state.title,slots})
        await axios.post("http://localhost:5500/schedules",{batchId:this.state.batchId,title:this.state.title,slots})
        this.props.history.push("/")
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    async componentDidMount(){
        let batches = await axios.get("http://localhost:5500/batches")
        batches = batches.data.data
        this.setState({batches})
    }
    
    render(){
        const {classes} = this.props
        return (
            <div className={classes.schedule}>
                <h1>add schedule</h1>
                <input className={classes.title} placeholder="enter title" name="title" value={this.state.title} onChange={this.handleChange} />
                <SelectBatch batchid={this.state.batchId} handleChange={this.handleChange} batches={this.state.batches} />
                {this.state.schedules.map(ele=><DaySchedule key={ele.id} {...ele} delete={this.deleteDay} submit={this.submitDay} />)}
                <Button className={classes.btn} variant="contained" color="primary" onClick={this.addDay} >addDay</Button>
                <Button className={classes.btn} variant="contained" color="primary" onClick={this.submitSchedule} >submit Schedule</Button>
            </div>
        )
    }
}


export default withStyles(styles)(AddSchedule)



//dayschedule
import React, { Component } from 'react'
import DatePicker from "./DatePicker"
import SlotGenerator from "./SlotGenerator"
import moment from "moment";
import {withStyles} from "@material-ui/core"
import Button from '@material-ui/core/Button';


const styles = {
    btn:{
        marginTop:"1rem",
        width:"8rem"
    },
    space:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    }
}

class DaySchedule extends Component {
    constructor(props){
        super(props)
        this.state = {date:moment().format("YYYY-MM-DD"),slots:props.slots}
    }
    changeDate = (date)=>{
        this.setState({date:moment(date).format("YYYY-MM-DD")})
        this.submit()
    }
    submitSlots = (slots)=>{
        this.setState({slots})
    }
    submit = ()=>{
        const formattedSlots = this.state.slots.map(ele=>{
            const slot = {}
            slot.startTime = `${this.state.date}T${ele.from}:00`
            console.log(moment(slot.startTime))
            slot.endTime = `${this.state.date}T${ele.end}:00`
            slot.position = ele.position
            return slot
        })
        this.props.submit(this.props.id,formattedSlots)
    }
    
    render() {
        const {classes} = this.props
        return (
            <div>
                <DatePicker changeDate={this.changeDate} date={this.state.date}/>
                <SlotGenerator submit={this.submitSlots} />
                <div className={classes.space}>
                <Button className={classes.btn} variant="contained" color="primary" onClick={this.submit}>submit day</Button>
                <Button className={classes.btn} variant="contained" color="secondary" onClick={()=>this.props.delete(this.props.id)}>delete day</Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(DaySchedule)






//slot generator
import React, { Component } from "react";
import Slot from "./Slot";
import uuid from "uuid/v4";
import moment from "moment";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


export class SlotGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = { slots: [] };
  }
  addSlot = () => {
    this.setState(st => ({
      slots: [
        ...st.slots,
        {
          from:moment()
          .hour(0)
          .minute(0),
          end: moment()
            .hour(0)
            .minute(0),
          number:1,
          id: uuid()
        }
      ]
    }));
  };
  removeSlot = id => {
    this.setState(st => ({
      slots: st.slots.filter(ele => ele.id !== id)
    }));
  };
  handleChange = (id,val,type)=>{
    this.setState(st=>({
      slots:st.slots.map(ele=>{
        if(ele.id===id){
          return {...ele,[type]:val}
        }
        return ele
      })
    }))
  }
  submit = ()=>{
    // const formattedSlots = this.state.slots.map(ele=>{
    //   return {...ele,from:ele.from.format("HH:mm"),end:ele.end.format("HH:mm")}
    // })
    let formattedSlots=[];
    [...this.state.slots].forEach(ele=>{
      for(let i=0;i<ele.number;i++){
        formattedSlots.push({...ele,from:ele.from.format("HH:mm"),end:ele.end.format("HH:mm"),position:i+1})
      }
    })
    this.props.submit(formattedSlots)
  }
  handleSlotNumber = (id,e)=>{
    this.setState(st=>({slots:st.slots.map(ele=>{
      if(ele.id===id){
        return {...ele,number:e}
      }
      return ele
    })
  }))
}
  render() {
    return (
      <div>
        {this.state.slots.map(ele => (
          <Slot key={ele.id} remove={this.removeSlot} {...ele} handleSlotNumber={this.handleSlotNumber} change={this.handleChange} submit={this.changeSlot} />
        ))}
        <ButtonGroup size="small" color="primary" style={{marginTop:"1rem"}} aria-label="small outlined button group">
        <Button onClick={this.addSlot}>add slot</Button>
        <Button onClick={this.submit}>Submit slots</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default SlotGenerator;








//slots
import React, { Component } from 'react'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css';
import {withStyles} from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete';


const styles = {
    number:{
        padding:"5px",
        borderRadius: "5px",
        border:"2px solid #ccc",
        outline:"none",
        width:"50px"
    }
}

export class Slot extends Component {
    constructor(props){
        super(props)
        this.state = {slots:1}
    }
    handleChange = (val,type)=>{
        this.props.change(this.props.id,val,type)
    }
    handleRemove = ()=>{
        this.props.remove(this.props.id)
    }
    handleSlotChange = (e)=>{
        this.props.handleSlotNumber(this.props.id,e.target.value)
    }

    render() {
        const {classes} = this.props
        return (
            <div>
                <TimePicker showSecond={false} inputReadOnly defaultValue={this.props.from} value={this.props.from} onChange={(val)=>this.handleChange(val,"from")} />
                <TimePicker showSecond={false} inputReadOnly defaultValue={this.props.end} value={this.props.end} onChange={(val)=>this.handleChange(val,"end")} />
                <input className={classes.number} name="slots" onChange={this.handleSlotChange} value={this.props.number} type="number"/>
                <DeleteIcon style={{marginTop:"15px"}} onClick={this.handleRemove} />
            </div>
        )
    }
}

export default withStyles(styles)(Slot)
