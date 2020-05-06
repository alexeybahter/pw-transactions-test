import React from "react";
import { TextField } from "@material-ui/core";
import NumberFormat from "react-number-format";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      allowNegative={false}
      thousandSeparator
      isNumericString
      prefix="PW "
    />
  );
}

export const InputNumber = ({label, setValue, value, ...props}) => {
  const handleChange = (event) => {
    setValue({
      ...value.number,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <TextField
      required
      label={label}
      value={value.number}
      onChange={handleChange}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
      {...props}
    />
  )
};
