import React from "react";
import Slot from "./Slot";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


function SlotGenerator (props) {
    return (
      <div>
        {props.timeSlots.map(ele => (
          <Slot key={ele._id} remove={props.remove} slotid={props.id} {...ele} handleSlotNumber={props.changeCount} change={props.changetimeslot} />
        ))}
        <ButtonGroup size="small" color="primary" style={{marginTop:"1rem"}} aria-label="small outlined button group">
        <Button onClick={()=>props.addtimeslot(props.id)}>add slot</Button>
        </ButtonGroup>
      </div>
    );
}


export default SlotGenerator;
