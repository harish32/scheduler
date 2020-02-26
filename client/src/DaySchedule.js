import React from 'react'
import DatePicker from "./DatePicker"
import SlotGenerator from "./SlotGenerator"
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

function DaySchedule (props){
    const changeDate = (date)=>{
       props.handleChange(date,props._id)
    }
    const {classes} = props
    return (
        <div>
            <DatePicker changeDate={changeDate} date={props.date}/>
            <SlotGenerator changeCount={props.changeCount} addtimeslot={props.addTimeSlot} remove={props.removeTimeSlot} changetimeslot={props.changeTimeSlot} id={props._id} timeSlots={props.timeSlots} />
            <div className={classes.space}>
            <Button className={classes.btn} variant="contained" color="secondary" onClick={()=>props.delete(props._id)}>delete day</Button>
            </div>
        </div>
    )
}

export default withStyles(styles)(DaySchedule)
