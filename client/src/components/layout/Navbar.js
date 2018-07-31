import React, { Component } from "react";
import icon from "../../images/svgs/cb-icon.svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
  getOnlineProfile,
  clearOnlineProfile
} from "../../actions/profileActions";

class Navbar extends Component {
  componentDidMount() {
    this.props.getOnlineProfile();
  }
  logoutClick = () => {
    this.props.clearOnlineProfile();
    this.props.logoutUser();
  };
  render() {
    let { isAuthenticated, user } = this.props.auth;
    let { profile, loading } = this.props.profile;
    let picture = user.profilePic;
    let authLinks = (
      <div>
        <span className="avatar">
          <img src={picture} alt=""/>
        </span>
        <span className="nav-one link">Welcome, {user.name}</span>
        <span className="nav-four link" onClick={this.logoutClick}>
          Log Out
        </span>
        <Link to="/posts" className="nav-three link">
          Posts
        </Link>
      </div>
    );
    let guestLinks = (
      <div>
        <span className="nav-one link">Welcome, Guest</span>
        <Link to="/login" className="nav-three link">
          Sign In
        </Link>
        <Link to="/register" className="nav-four link">
          Sign Up
        </Link>
      </div>
    );
    return (
      <nav className="navbar">
        <Link to="/">
          <img src={icon} alt="" />
        </Link>

        <Link to="/profiles" className="nav-two link">
          View All Profiles
        </Link>
        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearOnlineProfile: PropTypes.func.isRequired,
  getOnlineProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { logoutUser, clearOnlineProfile, getOnlineProfile }
)(Navbar);
