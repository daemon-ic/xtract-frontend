import axios from "axios";
import { DOMAIN } from "../misc/constants";

export const axiosConvertImageToZip = async (url, target) => {
  console.log("AXIOS CONVERT IMAGE TO ZIP FIRED...");
  try {
    const response = await axios.get(
      DOMAIN + `/image/download-zip?url=` + url + `&target=` + target
    );
    return response.data;
  } catch (error) {
    console.log("Axios Get User Failed...", error);
  }
};
