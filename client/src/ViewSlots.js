import React from "react";

export default function ViewSlots(props) {
  return (
    <>
      {props.schedule.slots.map(ele => (
        <div key={ele._id}>
          <h3>{ele.date.split("T")[0]}</h3>
          <ul>
            {ele.timeSlots.map(ele => (
              <li key={ele._id}>
                {ele.from}-{ele.end}-total-{ele.total}-remaining-{ele.count}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
