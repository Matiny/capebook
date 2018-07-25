import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwtdecode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
//Register User
export const registerUser = (userData, history) => dispatch => {
  //Post with axios, show data and set errors state
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login with JWT
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save to localStorage
      let { token } = res.data;
      localStorage.setItem("jwtToken", token);
      //Set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      let decoded = jwtdecode(token);
      //Set current user
      dispatch(setOnlineUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set Online User
export const setOnlineUser = decodedValue => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedValue
  };
};

//Log user out
export let logoutUser = () => dispatch => {
  //Delete token from localStorage
  localStorage.removeItem("jwtToken");
  //Delete token from auth header
  setAuthToken(false);
  //Set current user to {} thus setting isAuthenticated to false
  dispatch(setOnlineUser({}));
};
