import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export const Dropdown = ({ inputMode, setInputMode }) => {
  const handleChange = (event) => {
    setInputMode(event.target.value);
    console.log("CHANGING TO MODE: ", event.target.value);
  };

  return (
    <>
      <Select
        style={{
          height: "50px",
          width: "30%",
          borderRadius: "15px",
          marginBottom: "20px",
          marginRight: "10px",
        }}
        value={inputMode}
        onChange={handleChange}
      >
        <MenuItem value="Select mode">
          <em>Select mode</em>
        </MenuItem>
        <MenuItem value={"Images"}>Images</MenuItem>
        <MenuItem value={"Quizlet"}>Quizlet</MenuItem>
        {/* <MenuItem value={"Class"}>Class</MenuItem>
        <MenuItem value={"Id"}>Id</MenuItem>
        <MenuItem value={"Tag"}>Tag</MenuItem> */}
      </Select>
    </>
  );
};
