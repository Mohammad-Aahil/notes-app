import { useState } from "react";

export default function useInput(intialValue = "") {
  const [value, setValue] = useState(intialValue);
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    onchange: handleChange,
  };
}
