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
            <strong>Real Name:&nbsp;</strong>
            <p>{!isEmpty(profile.realname) ? profile.realname : "???"}</p>
          </figcaption>

          <figcaption>
            <strong>Location:&nbsp;</strong>
            <p>{!isEmpty(profile.location) ? profile.location : "???"}</p>
          </figcaption>

          <figcaption>
            <strong>Morality:&nbsp;</strong>
            <p>{profile.alignment}</p>
          </figcaption>

        </section>
      </div>
    );
  }
}

export default ProfileHeader;
