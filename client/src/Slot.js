import React from 'react'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css';
import {withStyles} from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete';
import moment from "moment"


const styles = {
    number:{
        padding:"5px",
        borderRadius: "5px",
        border:"2px solid #ccc",
        outline:"none",
        width:"50px"
    }
}


function Slot (props){
    const handleChange = (val,type)=>{
        props.change(props.slotid,props._id,val,type)
    }
    const handleRemove = ()=>{
        props.remove(props.slotid,props._id)
    }
    const handleSlotChange = (e)=>{
        props.handleSlotNumber(props.slotid,props._id,e.target.value)
    }
    const {classes} = props
    return (
        <div>
            <TimePicker showSecond={false} inputReadOnly defaultValue={moment(props.from,"HH:mm")} value={moment(props.from,"HH:mm")} onChange={(val)=>handleChange(val,"from")} />
            <TimePicker showSecond={false} inputReadOnly defaultValue={moment(props.end,"HH:mm")} value={moment(props.end,"HH:mm")} onChange={(val)=>handleChange(val,"end")} />
            <input className={classes.number} name="slots" onChange={handleSlotChange} value={props.count} type="number"/>
            <DeleteIcon style={{marginTop:"15px"}} onClick={handleRemove} />
        </div>
    )
}


export default withStyles(styles)(Slot)