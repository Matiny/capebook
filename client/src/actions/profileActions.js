import axios from "axios";
import { logoutUser } from "./authActions";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_ONLINE_PROFILE,
  SET_CURRENT_USER
} from "./types";

//Get profile of online user
export let getOnlineProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
};

// Get all profiles
export let getAllProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res => dispatch({ type: GET_PROFILES, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILES, payload: null }));
};

//Profile Loading
export let setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Create Profile
export let createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Profile Removal
export let clearOnlineProfile = () => {
  return {
    type: CLEAR_ONLINE_PROFILE
  };
};

// Add Media
export let addMedia = (mediaData, history) => dispatch => {
  axios
    .post("/api/profile/media", mediaData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Media
export let deleteMedia = id => dispatch => {
  axios
    .delete(`/api/profile/media/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete both account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This CANNOT be undone!")) {
    axios
      .delete("api/profile")
      .then(res => {
        dispatch(logoutUser());
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};
