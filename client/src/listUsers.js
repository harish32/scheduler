import React from "react";
import moment from "moment";

export default function listUsers(props) {
  const findSchedule = user => {
    const found = user.schedules.find(
      ele => ele.scheduleId === props.scheduleId
    );
    const from = found.from
      ? moment(found.from)
          .utcOffset("+5:30")
          .format("MM/DD HH:mm")
      : "NA";
    const to = found.to
      ? moment(found.to)
          .utcOffset("+5:30")
          .format("HH:mm")
      : "NA";
    return {
      from,
      to
    };
  };
  return (
    <div>
      {props.users.length > 0 &&
        props.users.map(ele => (
          <li key={ele._id}>
            {ele.name}---
            {findSchedule(ele).from} to {findSchedule(ele).to}
          </li>
        ))}
    </div>
  );
}
