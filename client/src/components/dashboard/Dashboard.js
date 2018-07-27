import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOnlineProfile, deleteAccount } from "../../actions/profileActions";
import { logoutUser } from "../../actions/authActions";

// Components
import ProfileButtons from "./ProfileButtons";
import Loading from "../common/loading";
import Media from "./Media";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getOnlineProfile();
  }

  deleteClick = () => {
    this.props.deleteAccount();
  };

  render() {
    const bgImage = {
      backgroundImage: `url(${require(`../../images/bgs/dashboard.jpg`)})`,
      backgroundSize: "cover",
      backgroundPosition: "center center"
    };
    let { user } = this.props.auth;
    let { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Loading />;
    } else {
      // Check if online user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <Link to={`profile/${profile.username}`} className="profile-button"><p>View Profile</p></Link>
            <ProfileButtons />
            {profile.media.length > 0 ?
              <Media media={profile.media} /> : null}

            <div className="delete-account">
              <span onClick={this.deleteClick}>
                <p>Delete Account</p>
              </span>
            </div>
          </div>
        );
      } else {
        // User is online with no profile
        dashboardContent = (
          <section>
            <p className="profile-msg">
              {user.name}, it looks like you haven't created a profile yet.
              <br />
              Click below to begin.
            </p>
            <Link to="/create-profile" className="profile-button">
              <p>Create Profile</p>
            </Link>
          </section>
        );
      }
    }
    return (
        <main style={bgImage}>
          <div className="dashboard">
            <section className="h1">
              <h1>Dashboard</h1>
            </section>
            {dashboardContent}
          </div>
        </main>
    );
  }
}

Dashboard.propTypes = {
  getOnlineProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

let mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getOnlineProfile, deleteAccount, logoutUser }
)(Dashboard);
