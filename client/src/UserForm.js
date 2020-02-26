import React, { useEffect } from "react";
import useInputState from "./hooks/useInputState";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import objectid from "bson-objectid";

const useStyles = makeStyles({
  inp: {
    marginLeft: "1rem"
  },
  btn: {
    marginLeft: "1rem",
    marginTop: "1rem"
  }
});

function UserForm(props) {
  const classes = useStyles();
  const [name, setname, resetname, seteditname] = useInputState(
    props.user.name || ""
  );
  const [email, setemail, resetemail, seteditemail] = useInputState(
    props.user.email || ""
  );
  const [mobile, setmobile, resetmobile, seteditmobile] = useInputState(
    props.user.mobile || ""
  );
  const handleSubmit = e => {
    let id = objectid();
    id = id.str;
    e.preventDefault();
    if (props.edit) {
      props.updateUser(props.user._id, {
        name,
        email,
        mobile,
        password: mobile
      });
    } else {
      props.addUser({ name, email, mobile, _id: id, password: mobile });
    }
    resetname();
    resetemail();
    resetmobile();
  };
  useEffect(() => {
    seteditname(props.user.name);
    seteditemail(props.user.email);
    seteditmobile(props.user.mobile);
  }, [props.user]);
  useEffect(() => {
    ValidatorForm.addValidationRule(
      "isValidNumber",
      value => value.length === 10
    );
  }, []);
  return (
    <ValidatorForm
      onSubmit={handleSubmit}
      onError={errors => console.log(errors)}
    >
      <TextValidator
        className={classes.inp}
        label="Name"
        onChange={setname}
        name="name"
        value={name}
        validators={["required"]}
        errorMessages={["this field is required"]}
      />
      <TextValidator
        className={classes.inp}
        label="Email"
        onChange={setemail}
        name="email"
        value={email}
        validators={["required", "isEmail"]}
        errorMessages={["this field is required", "email not valid"]}
      />
      <TextValidator
        className={classes.inp}
        label="Mobile"
        onChange={setmobile}
        name="mobile"
        value={mobile}
        validators={["required", "isValidNumber"]}
        errorMessages={["this field is required", "enetr valid number"]}
      />
      <Button
        size="small"
        className={classes.btn}
        variant="outlined"
        color="primary"
        type="submit"
      >
        Submit
      </Button>
    </ValidatorForm>
  );
}

export default UserForm;
