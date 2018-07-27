import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../utils/is-empty";

class ProfileAbout extends Component {
  render() {
    let { profile } = this.props;
    let skills;
    // Get skill list
    if (profile.skills) {
      skills = profile.skills.map((skill, index) => (
          <p className="skill-item" key={index}>{skill}</p>
      ));
    }

    return (
      <div>
        <div className="profile-padding" />
        <section className="profile-about">
          {/* Check to see if any of this content is present 1st */}

          {!isEmpty(profile.bio) ? (
            <p className="bio">
              Bio:<br />
              {profile.bio}
            </p>
          ) : (
            <p className="bio">No Bio is available!</p>
          )}

          <figcaption>
            <h2 className="skills">Skills:</h2>
            {skills}
          </figcaption>

          {!isEmpty(profile.bio) ? (
            <p className="origin">
              1st Appearance: <br />
              {profile.origin}
            </p>
          ) : (
            <p className="origin">???</p>
          )}

        </section>
      </div>
    );
  }
}

export default ProfileAbout;
