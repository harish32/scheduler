import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function SelectBatch(props) {
  const classes = useStyles();
  const handleChange = e => {
    if (props.switch) {
      props.handleChange(props.type, e);
    } else {
      props.handleChange(e);
    }
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="age-native-simple">{props.heading}</InputLabel>
      <Select
        native
        value={props.default}
        onChange={handleChange}
        inputProps={{
          name: props.name,
          id: "batch"
        }}
      >
        <option key={"dsdjsj"} value="" />
        {props.options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
