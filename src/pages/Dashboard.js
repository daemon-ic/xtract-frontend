import { useEffect, useState } from "react";
import { useUserInfo } from "../hooks/useUserInfo";
import { Button, InputBase } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { makeCopyOf, capFirstLetter } from "../misc/utils";
import { axiosUpdateUser } from "../api/userCalls";
import { axiosScrape } from "../api/pptrCalls";
import { AUTH_TOKEN, QUIZLET_DEFAULT_TARGET } from "../misc/constants";
const { uuid } = require("uuidv4");

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
  siteButtonsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  siteButtons: {
    backgroundColor: "white",
    width: "90%",
    minWidth: "100px",
    height: "60px",
    borderRadius: "15px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    color: "black",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "black",
    color: "white",
    borderRadius: "16px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  logoutButton: {
    marginRight: "50px",
    color: "white",
  },
};

const blank = {
  id: "",
  name: "",
  url: "",
  target: "",
};

const Dashboard = () => {
  const { user, getUser } = useUserInfo();
  const [formInfo, setFormInfo] = useState(blank);
  const [extractedData, setExtractedData] = useState({});

  const updateForm = (e, key) => {
    const formInfo_copy = makeCopyOf(formInfo);
    formInfo_copy[key] = e.target.value;
    setFormInfo(formInfo_copy);
  };
  //NOTES: if using an object property and a prop of that prop, always check for undefindes
  // aka object && object.prop && etc

  // never creat uuid from font end, do in server
  // tap update user in try catch // any axios, use try/catch
  //deep copy blank
  const handleSubmit = async () => {
    const user_copy = makeCopyOf(user);
    let finalTargetValue = "";

    if (formInfo.target === "") finalTargetValue = QUIZLET_DEFAULT_TARGET;

    user_copy.sites.unshift({
      id: uuid(),
      name: formInfo.name,
      url: formInfo.url,
      target: finalTargetValue,
    });
    await axiosUpdateUser(user_copy._id, user_copy);
    getUser();
    setFormInfo(blank);
  };

  const initSiteScrape = async (url, target) => {
    try {
      // showLoadingToast();
      const result = await axiosScrape(url, target);
      console.log(result);
      // toast.dismiss();
    } catch (error) {
      console.log("extraction failed...", error);
    }
  };

  // try/catch, check undefines
  // deep clone redundant here, not setting obj/array to state here
  const deleteSite = async (id) => {
    const user_copy = makeCopyOf(user);
    const newSiteList = user_copy.sites.filter((site) => {
      return site.id !== id;
    });
    user_copy.sites = newSiteList;
    await axiosUpdateUser(user_copy._id, user_copy);
    getUser();
  };

  const handleLogout = () => {
    window.localStorage.removeItem(AUTH_TOKEN);
    getUser();
  };

  const showLoadingToast = () =>
    toast.loading("Xtracting...", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  return (
    <div className="full-contianer">
      <div className="navbar">
        <Button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="main-container">
        <div className="split left">
          <div className="box description">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "90%",
              }}
            >
              {user && user.name ? (
                <h1>Hello, {capFirstLetter(user.name)}.</h1>
              ) : (
                <h1>Loading...</h1>
              )}

              <p>
                Welcome to Xtract. Here you can extract website data with the
                press of a button. This app is designed to pull from Quizlet by
                default. You can also pull from any site by entering a query
                selection.
              </p>
            </div>
          </div>
          <div className="box inputs">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
              }}
            />
            <InputBase
              placeholder="* Enter a name for this operation"
              style={styles.input}
              value={formInfo.name}
              onChange={(e) => updateForm(e, "name")}
            />
            <InputBase
              placeholder="* https://quizlet.com/..."
              style={styles.input}
              value={formInfo.url}
              onChange={(e) => updateForm(e, "url")}
            />
            <InputBase
              placeholder="Enter query selector element"
              style={styles.input}
              value={formInfo.target}
              onChange={(e) => updateForm(e, "target")}
            />
            <Button
              style={styles.button}
              variant="standard"
              onClick={handleSubmit}
            >
              Create
            </Button>
          </div>
        </div>
        <div className="split right">
          <div className="box sites">
            <div
              style={{
                width: "90%",
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
            >
              <h3>Operations</h3>
              <p>
                A list of your created operations. Select one to begin
                Xtracting.
              </p>
              <ToastContainer />
            </div>

            {user &&
              user.sites &&
              user.sites.map((site) => (
                <div key={site.id} style={styles.siteButtonsContainer}>
                  <Button
                    style={styles.siteButtons}
                    onClick={() => {
                      initSiteScrape(site.url, site.target);
                    }}
                  >
                    <CancelIcon
                      onClick={() => {
                        deleteSite(site.id);
                      }}
                    />
                    {site.name}
                    <CancelIcon style={{ visibility: "hidden" }} />
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

//helper//
