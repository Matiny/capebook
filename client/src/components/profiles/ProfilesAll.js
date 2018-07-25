import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllProfiles } from "../../actions/profileActions";

import Loading from "../common/loading";
import ProfileItem from "./ProfileItem";

class ProfilesAll extends Component {
  componentDidMount() {
    this.props.getAllProfiles();
  }
  constructor(props) {
    super(props);
    this.state = {
      number: Math.floor(Math.random() * 9) + 1
    };
  }

  render() {
    //Random bg image on refresh
    const styles = {
      backgroundImage: `url(${require(`../../images/bgs/${
        this.state.number
      }.jpg`)})`,
      backgroundSize: "cover",
      backgroundPosition: "center center"
    };
    let { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Loading />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h1>No Character Profiles Found!</h1>;
      }
    }
    return (
      <section style={styles}>
        <h1 className="browse">Browse the Character Profiles</h1>
        {profileItems}
      </section>
    );
  }
}

ProfilesAll.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

let mapStatetoProps = state => ({
  profile: state.profile
});

export default connect(
  mapStatetoProps,
  { getAllProfiles }
)(ProfilesAll);
