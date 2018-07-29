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
        <li className="skill-item" key={index}>
          {skill}
        </li>
      ));
    }

    return (
      <div>
        <div className="smaller-padding" />
        <section className="profile-about">
          {/* Check to see if any of this content is present 1st */}

          <div className="bio">
            <h1>Bio:</h1>
            <p>
              {!isEmpty(profile.bio) ? profile.bio : "No Bio is available!"}
            </p>
          </div>

          <div className="skills">
            <h1>Skills:</h1>
            <ul className="skill-list">{skills}</ul>
          </div>

          <div className="origin">
            <h1>1st Appearance:</h1>
            <p>{!isEmpty(profile.origin) ? profile.origin : "???"}</p>
          </div>

        </section>
      </div>
    );
  }
}

export default ProfileAbout;
