import React from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete as AutocompleteUI } from "@material-ui/lab";

export const Autocomplete = ({
                               value,
                               setValue,
                               options,
                               label,
                               keyName,
                               ...props
}) => {
  return (
    <AutocompleteUI
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      blurOnSelect={true}
      noOptionsText="No Client Name"
      getOptionLabel={(option) => option[keyName]}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          required
          label={label}
          variant="outlined"
          onKeyPress={(ev) => ev.key === 'Enter' && ev.preventDefault()}
          {...props} />)}
    />
  )
};
