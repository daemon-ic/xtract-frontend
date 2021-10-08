import { Button, InputBase } from "@mui/material";
import { Dropdown } from "./Dropdown";
import { MODE_SETTINGS } from "../../misc/constants";

const styles = {
  input: {
    paddingLeft: "30px",
    paddingRight: "30px",
    borderRadius: "15px",
    height: "50px",
    backgroundColor: "#f0f0f0",
    width: "100%",
    marginBottom: "20px",
  },
  advancedInput: {
    paddingLeft: "30px",
    paddingRight: "30px",
    borderRadius: "15px",
    height: "50px",
    backgroundColor: "#f0f0f0",
    width: "70%",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "black",
    color: "white",
    borderRadius: "16px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
};

export const Inputs = ({
  formInfo,
  updateForm,
  handleSubmit,
  inputMode,
  setInputMode,
}) => {
  const { URL, NAME, TARGET } = MODE_SETTINGS[inputMode];

  return (
    <div className="box inputs">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Dropdown inputMode={inputMode} setInputMode={setInputMode} />

        {/* NAME */}
        <InputBase
          placeholder={NAME.placeholder}
          disabled={NAME.disable}
          style={styles.advancedInput}
          value={formInfo.name}
          onChange={(e) => updateForm(e, "name")}
        />
      </div>

      {/* URL */}
      <InputBase
        placeholder={URL.placeholder}
        disabled={URL.disable}
        style={styles.input}
        value={formInfo.url}
        onChange={(e) => updateForm(e, "url")}
      />

      {/* TARGET */}
      <InputBase
        placeholder={TARGET.placeholder}
        disabled={TARGET.disable}
        style={styles.input}
        value={formInfo.target}
        onChange={(e) => updateForm(e, "target")}
      />

      <Button style={styles.button} variant="standard" onClick={handleSubmit}>
        Create
      </Button>
    </div>
  );
};
