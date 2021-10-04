import { useState, useEffect } from "react";
import { axiosGetUser } from "../api/userCalls";
import { useHistory } from "react-router-dom";
import { AUTH_TOKEN } from "../misc/constants";

// NOTES: use history outside, functions doing too many things
// do it outside of the hook
//call user info in the app
// history in the compnoents

// component as a wrapper, handle check user

export const useUserInfo = () => {
  let history = useHistory();
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    if (!localStorage.getItem(AUTH_TOKEN)) {
      console.log("NOT LOGGED IN");
      setUser({});
      history.push("/");
    } else {
      console.log("LOGGED IN");
      if (window.location.pathname === "/") history.push("/dashboard");
      const idFromToken = JSON.parse(localStorage.getItem(AUTH_TOKEN))["_id"];
      const currentUser = await axiosGetUser(idFromToken);
      setUser(currentUser);
    }
  };

  return { user, getUser };
};
