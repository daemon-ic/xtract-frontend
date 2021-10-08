import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

import { useUserInfo } from "../../hooks/useUserInfo";
import { Inputs } from "./Inputs";
import { OperationsButtons } from "./OperationsButtons";
import { Description } from "./Description";
import { formatData, downloadFile, modifySelector } from "./utils";
import { makeCopyOf, sleep, sleepInterval } from "../../misc/utils";
import { axiosDetect, axiosScrape } from "../../api/pptrCalls";
import { axiosUpdateUser } from "../../api/userCalls";

import { AUTH_TOKEN, QUIZLET_DEFAULT_TARGET } from "../../misc/constants";
import "react-toastify/dist/ReactToastify.min.css";
const { uuid } = require("uuidv4");

const styles = {
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

// TODO: maybe i can save the data so its faster the second time
// TODO: make a data deletion

// try/catch, check undefines
// deep clone redundant here, not setting obj/array to state here

//NOTES: if using an object property and a prop of that prop, always check for undefindes
// aka object && object.prop && etc

// never creat uuid from font end, do in server
// tap update user in try catch // any axios, use try/catch
//deep copy blank

const Dashboard = () => {
  const { user, getUser } = useUserInfo();
  const [formInfo, setFormInfo] = useState(blank);
  const [inputMode, setInputMode] = useState("Select mode");
  const [disableOperation, setDisableOperation] = useState(false);
  const [attempts, setAttempts] = useState(20);
  const toastRef = useRef(null);

  const currentAttemptsRef = useRef(20);

  const updateForm = (e, key) => {
    const formInfo_copy = makeCopyOf(formInfo);
    formInfo_copy[key] = e.target.value;
    setFormInfo(formInfo_copy);
  };

  const handleSubmit = async () => {
    const user_copy = makeCopyOf(user);
    let formInfo_copy = makeCopyOf(formInfo);

    // option for manual mode

    if (inputMode !== "Developer") {
      formInfo_copy = modifySelector(formInfo_copy, inputMode);
    }
    console.log("FINAL FORM: ", formInfo_copy);

    user_copy.sites.unshift({
      id: uuid(),
      name: formInfo_copy.name,
      url: formInfo_copy.url,
      target: formInfo_copy.target,
    });
    initSiteScrape(formInfo_copy.url, formInfo_copy.target, formInfo_copy.name);
    await axiosUpdateUser(user_copy._id, user_copy);
    getUser();
    setFormInfo(blank);
  };

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

  const initSiteScrape = async (url, target, name) => {
    console.log("INIT SITE SCRAPING...");
    if (disableOperation) {
      console.log("You are already running an operation, please wait...");
      return;
    }
    try {
      setDisableOperation((currState) => (currState = true));
      showLoadingToast(attempts);
      const uid = await axiosScrape(url, target, name);
      const extractedData = await autoDetection(uid);

      toast.dismiss();
      await sleep(500);
      setAttempts(20);
      currentAttemptsRef.current = 20;
      toast.update(toastRef.current, {
        render: `Xtracting... ${20 - currentAttemptsRef.current}/20`,
        progress: 4900 / 5000,
      });
      setDisableOperation((currState) => (currState = false));

      const confirmed = confirm("Would you like to download the data?");

      //------------------------------------------------------------------------- FOR IMAGE URL
      //   if (confirmed && extractedData && extractedData.result) {
      //     downloadFile(formatData(extractedData));
      //   } else {
      //     console.log("IMAGES WERE EXTRACTED");
      //   }
      // } catch (error) {
      //   console.log("EXTRACTION FAILED...", error);
      // }
      //------------------------------------------------------------------------- FOR IMAGE URL
      //------------------------------------------------------------------------- FOR IMAGE ZIP DOWNLOAD
      if (
        confirmed &&
        extractedData &&
        extractedData.result &&
        extractedData.result.text
      ) {
        downloadFile(formatData(extractedData));
      } else if (
        confirmed &&
        extractedData &&
        extractedData.result &&
        extractedData.result.images
      ) {
        const url =
          "https://firebasestorage.googleapis.com/v0/b/xtract-bf4dd.appspot.com/o/" +
          name +
          ".zip?alt=media&t=" +
          Date.now();
        console.log("url: ", url);
        const link = document.createElement("a");
        link.href = url;
        document.body.appendChild(link);
        link.click();
        link.remove();
        console.log("IMAGES WERE EXTRACTED");
      }
    } catch (error) {
      console.log("EXTRACTION FAILED...", error);
    }
    //------------------------------------------------------------------------- FOR IMAGE ZIP DOWNLOAD
  };

  const autoDetection = async (uid) => {
    console.log("AUTO DETECTION FIRED...");
    let data = null;

    while (!data && currentAttemptsRef.current > 0) {
      try {
        data = await axiosDetect(uid);
        console.log("DATA: ", data);
        console.log("ATTEMPTS LEFT: ", currentAttemptsRef.current);
      } catch (error) {
        console.log("No data yet...");
      }
      currentAttemptsRef.current = currentAttemptsRef.current - 1;
      setAttempts((prevState) => (prevState -= 1));
      toast.update(toastRef.current, {
        render: `Xtracting... ${20 - currentAttemptsRef.current}/20`,
        progress: 1,
      });
      await sleepInterval(5000, 100, (progress) => {
        toast.update(toastRef.current, {
          render: `Xtracting... ${20 - currentAttemptsRef.current}/20`,
          progress: progress,
        });
      });
    }
    console.log("AUTO DETECTION COMPLETE!");
    return data;
  };

  const showLoadingToast = () =>
    (toastRef.current = toast.loading(`Xtracting... ${20 - attempts}/20`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: 1,
      theme: "dark",
    }));

  if (!user) return <h1>Loading...</h1>;
  return (
    <div className="full-contianer">
      <div className="navbar">
        <div
          style={{
            marginLeft: "50px",
            fontSize: "40px",
            fontWeight: "800",
            color: "white",
          }}
        >
          Xtract.
        </div>
        <Button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="main-container">
        <div className="split left">
          {user && user.name && <Description name={user.name} />}
          <Inputs
            formInfo={formInfo}
            updateForm={updateForm}
            handleSubmit={handleSubmit}
            inputMode={inputMode}
            setInputMode={setInputMode}
          />
        </div>
        <div className="split right">
          {user && user.sites && (
            <OperationsButtons
              sites={user.sites}
              initSiteScrape={initSiteScrape}
              deleteSite={deleteSite}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
