import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsername } from "../../actions/profileActions";
// Components
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileStories from "./ProfileStories";
import Loading from "../common/loading";

class MainProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: Math.floor(Math.random() * 9) + 1
    };
  }
  componentDidMount() {
    // Use Router to grab the username param
    let onlineUser = this.props.match.params.username;
    if (onlineUser) {
      this.props.getUsername(onlineUser);
    }
  }

  componentDidUpdate() {
    const { profile } = this.props.profile;
    if (profile === null) {
      this.props.history.push("/");
    }
  }

  render() {
    const styles = {
      backgroundImage: `url(${require(`../../images/bgs/${
        this.state.number
      }.jpg`)})`
    };
    const { profile, loading } = this.props.profile;
    let profileContent;
    let storyList;

    if (profile === null || loading || !profile.media) {
      profileContent = <Loading />;
    } else {
      storyList = profile.media.length;
      profileContent = (
        <section>
          <div className="profile-padding" />
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          {
            storyList ? <ProfileStories profile={profile}/> : null
          }

          <div className="profile-padding" />
        </section>
      );
    }
    return <main style={styles}>{profileContent}</main>;
  }
}

MainProfile.propTypes = {
  getUsername: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

let mapStateToProps = state => ({
  profile: state.profile,
  auth: state.profile
});

export default connect(
  mapStateToProps,
  { getUsername }
)(MainProfile);
