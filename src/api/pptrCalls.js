import axios from "axios";
import { DOMAIN } from "../misc/constants";

export const axiosScrape = async (url, target, name) => {
  console.log("AXIOS SCRAPE FIRED...");
  try {
    const response = await axios.get(
      DOMAIN + `/pptr/scrape?url=` + url + `&target=` + target + `&name=` + name
    );
    return response.data;
  } catch (error) {
    console.log("Axios Get User Failed...", error);
  }
};

export const axiosDetect = async (uid) => {
  console.log("AXIOS DETECT FIRED...");
  try {
    console.log("Attempting to connect to backend...");
    const response = await axios.get(DOMAIN + `/pptr/detect/${uid}`);
    console.log("Axios Detecting extraction Fired!");
    return response.data;
  } catch (error) {
    console.log("Axios Detecting Extracted Data Failed...");
  }
};
