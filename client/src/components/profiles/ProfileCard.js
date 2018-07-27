import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ProfileCard extends Component {
  render() {
    // Extract profile info from passed in redux profiles
    let { profile } = this.props;
    return (
      <section className="card-padding">
        <Link to={`profile/${profile.username}`}>
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
        </Link>
      </section>
    );
  }
}

ProfileCard.propTypes = {
  profile : PropTypes.object.isRequired
};

export default ProfileCard;
