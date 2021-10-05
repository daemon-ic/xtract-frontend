import axios from "axios";
import { AUTH_TOKEN, DOMAIN } from "../misc/constants";

export const axiosSignUp = async (payload) => {
  console.log(DOMAIN + "/user/signup");
  try {
    console.log(DOMAIN);
    const response = await axios.post(DOMAIN + "/user/signup", payload);
    console.log(response.data);

    if (!response.data._id) return;
    localStorage.setItem(AUTH_TOKEN, JSON.stringify(response.data));
  } catch (error) {
    console.log("Axios Sign Up Failed... ", error);
  }
};

export const axiosLogIn = async (payload) => {
  try {
    const response = await axios.post(DOMAIN + "/user/login", payload);
    console.log(response.data);

    if (!response.data._id) return;
    localStorage.setItem(AUTH_TOKEN, JSON.stringify(response.data));
  } catch (error) {
    console.log("Axios Login Failed... ", error);
  }
};

export const axiosGetUser = async (id) => {
  try {
    const response = await axios.get(DOMAIN + `/user/get/${id}`);
    console.log("Axios Get User Fired!...");
    return response.data;
  } catch (error) {
    console.log("Axios Get User Failed...", error);
  }
};

export const axiosUpdateUser = async (id, payload) => {
  try {
    await axios.put(DOMAIN + `/user/update/${id}`, payload);
    console.log("Axios Update User Fired!");
    console.log(payload);
  } catch (error) {
    console.log("Axios Update User Failed...", error);
  }
};
