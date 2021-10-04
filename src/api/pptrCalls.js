import axios from "axios";
import { DOMAIN } from "../misc/constants";

export const axiosScrape = async (URL, target) => {
  console.log("axios reached...");
  console.log(target);
  try {
    const response = await axios.get(
      DOMAIN + `/pptr/scrape?url=` + URL + `&target=` + target
    );
    return response.data;
  } catch (error) {
    console.log("Axios Get User Failed...", error);
  }
};
