import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import { setOnlineUser, logoutUser } from "./actions/authActions";
import { clearOnlineProfile } from "./actions/profileActions";
import jwtdecode from "jwt-decode";
import store from "./store";

//Components
import Navbar from "./components/layout/Navbar.js";
import Home from "./components/layout/Home.js";
import Register from "./components/auth/Register.js";
import Login from "./components/auth/Login.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/dashboard/CreateProfile";
import EditProfile from "./components/dashboard/EditProfile";
import AddMedia from "./components/dashboard/AddMedia";
import ProfilesAll from "./components/profiles/ProfilesAll";
import MainProfile from "./components/profiles/MainProfile";

// CSS
import "./css/dashboard.min.css";
import "./css/layout.min.css";
import "./css/profile.min.css";
import "./css/auth.min.css";

//Check for token in localStorage
if (localStorage.jwtToken) {
  // Set the token to auth header
  setAuthToken(localStorage.jwtToken);
  // Decode token and gain user info
  let decoded = jwtdecode(localStorage.jwtToken);
  // Set user via store actions
  store.dispatch(setOnlineUser(decoded));

  // Check for expired jwtToken
  let currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Log out user
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearOnlineProfile());
    //Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <Navbar />
            <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={ProfilesAll} />
              <Route exact path="/profile/:username" component={MainProfile} />
              {/* Protected Routes */}

              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-media"
                  component={AddMedia}
                />
              </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
