import { Paper, InputBase, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useUserInfo } from "../../hooks/useUserInfo";
import { axiosSignUp, axiosLogIn } from "../../api/userCalls";
import { makeCopyOf } from "../../misc/utils";

const styles = {
  paper: {
    backgroundColor: "black",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "column",
    width: "350px",
  },
  inputContainer: {
    borderRadius: "15px",
    paddingTop: "30px",
    paddingBottom: "30px",
    marginBottom: "40px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  inputTitle: {
    marginBottom: "10px",
    fontSize: "22px",
  },
  error: {
    fontSize: "15px",
    color: "red",
    marginBottom: "15px",
    width: "80%",
    textAlign: "center",
  },
  input: {
    paddingLeft: "30px",
    paddingRight: "30px",
    borderRadius: "15px",
    height: "40px",
    backgroundColor: "#f0f0f0",
    width: "80%",
    marginBottom: "20px",
  },

  button: {
    backgroundColor: "black",
    color: "white",
    borderRadius: "16px",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginBottom: "20px",
  },
  smallText: {
    cursor: "pointer",
    fontSize: "14px",
    textDecoration: "underline",
  },
};

const blankForm = {
  name: "",
  email: "",
  password: "",
};

const ERROR = {
  EMAIL_IN_USE: "This email is already in use",
  CANT_CREATE_USER: "There was an error creating this user",
  USER_DOES_NOT_EXIST: "This user does not exist",
  INCORRECT_PASSWORD: "Incorrect password, please try again",
  INCOMPLETE_FORM: "Please fill out all of the fields below",
  INVALID_EMAIL: "Please enter a valid email",
  SHORT_PASSWORD: "Your password needs to have at least 8 characters",
};

// NOTES: better to put object into a use state, to avoid conflicts with objects/arrays
// or make deep copy of the object/array before init state with it
const LoginPage = () => {
  const { user, getUser } = useUserInfo();

  const [hasAccount, setHasAccount] = useState(true);
  const [formInfo, setFormInfo] = useState(blankForm);
  const [errorCode, setErrorCode] = useState("");

  const updateForm = (e) => {
    const formInfo_copy = makeCopyOf(formInfo);
    formInfo_copy[e.target.name] = e.target.value;
    setFormInfo(formInfo_copy);
  };

  // NOTES: pass strings to handle submit, them make an if statement to determind function
  const handleSubmit = async (callback) => {
    console.log(formInfo);
    const result = await callback(formInfo);
    if (result) setErrorCode(result);
    setFormInfo(blankForm);
    getUser();
  };

  const changeForm = () => {
    setHasAccount(!hasAccount);
    setErrorCode("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2b2b2b",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Paper style={styles.paper}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "60px",
              paddingTop: "20px",
              paddingBottom: "0px",
            }}
          >
            Xtract.
          </h1>
          <p
            style={{
              color: "white",
              marginTop: "-10px",
              paddingBottom: "30px",
            }}
          >
            Online Media Scraper
          </p>
        </div>

        <div style={styles.inputContainer}>
          {!hasAccount ? (
            <h3 style={styles.inputTitle}>Welcome</h3>
          ) : (
            <h3 style={styles.inputTitle}> Welcome Back</h3>
          )}
          {errorCode && <p style={styles.error}>{ERROR[errorCode]}</p>}
          {!hasAccount && (
            <InputBase
              placeholder="Full Name"
              style={styles.input}
              name={"name"}
              value={formInfo.name}
              onChange={updateForm}
              label="Name"
            />
          )}

          <InputBase
            placeholder="Email"
            style={styles.input}
            name={"email"}
            value={formInfo.email}
            onChange={updateForm}
            label="Email"
          />
          <InputBase
            placeholder="Password"
            style={styles.input}
            name={"password"}
            value={formInfo.password}
            onChange={updateForm}
            label="Password"
            type="password"
          />
          {!hasAccount ? (
            <Button
              style={styles.button}
              onClick={() => handleSubmit(axiosSignUp)}
            >
              Sign Up
            </Button>
          ) : (
            <Button
              style={styles.button}
              onClick={() => handleSubmit(axiosLogIn)}
            >
              Login
            </Button>
          )}

          {hasAccount ? (
            <div style={styles.smallText} onClick={changeForm}>
              Click here to sign up
            </div>
          ) : (
            <div style={styles.smallText} onClick={changeForm}>
              Click here to login
            </div>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default LoginPage;

// helper
