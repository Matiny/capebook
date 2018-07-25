import axios from "axios";

let setAuthToken = token => {
  if (token) {
    //Apply to all requests
    axios.defaults.headers.common["Authorization"] = token;
  }
  else {
    //Delete auth header
    delete axios.defaults.headers.common["Authorization"]
  }
};

export default setAuthToken;
