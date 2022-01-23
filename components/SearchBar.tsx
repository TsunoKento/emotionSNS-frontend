import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const options = ["Option 1", "Option 2"];

export const SearchBar = () => {
  const [value, setValue] = React.useState<string | null>("");
  const [inputValue, setInputValue] = React.useState("");

  return (
    <Autocomplete
      value={value}
      onChange={(event: any, newValue: string | null) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={options}
      freeSolo
      renderInput={(params) => <TextField {...params} label="Search" />}
    />
  );
};
