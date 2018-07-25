import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../utils/is-empty";

class ProfileItem extends Component {
  render() {
    let { profile } = this.props;
    console.log(profile);
    return (
      <div className="card">
        <h1 className="profile-name">{profile.user.name}</h1>
        <div className="profile-pic">
          <img src={profile.profilePic} alt=""/>
        </div>
        <div className="info-box">
          <p className="info1">Location: {profile.location}</p>
          <p className="info2">Morality: {profile.alignment}</p>
          <p className="info3">Number of Skills: {profile.skills.length}</p>
        </div>  
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile : PropTypes.object.isRequired
};

export default ProfileItem;
