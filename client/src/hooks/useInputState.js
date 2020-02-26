import { useState } from "react";

const useInputState = (val = "") => {
  const [state, setState] = useState(val);
  const handleChange = e => {
    setState(e.target.value);
  };

  const reset = () => setState("");
  return [state, handleChange, reset, setState];
};

export default useInputState;
