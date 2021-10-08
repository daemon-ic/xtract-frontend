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
    marginBottom: "50px",
    fontSize: "22px",
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

// NOTES: better to put object into a use state, to avoid conflicts with objects/arrays
// or make deep copy of the object/array before init state with it
const LoginPage = () => {
  const { user, getUser } = useUserInfo();

  const [hasAccount, setHasAccount] = useState(true);
  const [formInfo, setFormInfo] = useState(blankForm);

  const updateForm = (e) => {
    const formInfo_copy = makeCopyOf(formInfo);
    formInfo_copy[e.target.name] = e.target.value;
    setFormInfo(formInfo_copy);
  };

  // NOTES: pass strings to handle submit, them make an if statement to determind function
  const handleSubmit = async (callback) => {
    console.log(formInfo);
    await callback(formInfo);
    setFormInfo(blankForm);
    getUser();
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
            <div
              style={styles.smallText}
              onClick={() => {
                setHasAccount(!hasAccount);
              }}
            >
              Click here to sign up
            </div>
          ) : (
            <div
              style={styles.smallText}
              onClick={() => {
                setHasAccount(!hasAccount);
              }}
            >
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
