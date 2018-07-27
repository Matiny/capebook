import React, { Component } from "react";
import isEmpty from "../../utils/is-empty";
import Loading from "../common/loading";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div>
        <section className="profile-header">
          <h1>{profile.user ? profile.user.name : <Loading />}</h1>
          <figure>
            <img src={profile.profilePic} alt="" />
          </figure>
          <figcaption>
            <p>
              Real Name: {!isEmpty(profile.realname) ? profile.realname : "???"}
            </p>
            <p>
              Location: {!isEmpty(profile.location) ? profile.location : "???"}
            </p>
            <p>Morality: {profile.alignment}</p>
          </figcaption>
        </section>
      </div>
    );
  }
}

export default ProfileHeader;
