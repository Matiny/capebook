import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Select from "../common/Select";
import { createProfile, getOnlineProfile } from "../../actions/profileActions";
import isEmpty from '../../utils/is-empty';


class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      username: "",
      bio: "",
      alignment: "",
      location: "",
      skills: "",
      origin: "",
      number: Math.floor(Math.random() * 9) + 1
    };
  }

  componentDidMount() {
    this.props.getOnlineProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      // Set the profile state to a var of the same name
      let profile = nextProps.profile.profile;
      // Convert skills array into CSV
      let skillsCSV = profile.skills.join(",");
      // If profile value doesn't exist, convert to empty string
      profile.username = !isEmpty(profile.username) ? profile.username : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.alignment = !isEmpty(profile.alignment) ? profile.alignment : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.origin = !isEmpty(profile.origin) ? profile.origin : "";

      this.setState({
        username: profile.username,
        bio: profile.bio,
        alignment: profile.alignment,
        location: profile.location,
        skills: skillsCSV,
        origin: profile.origin
      });
    }
  }

  //Set text values to state
  newValue = e => this.setState({ [e.target.name]: e.target.value });

  submitForm = () => {
    let profileData = {
      username: this.state.username,
      bio: this.state.bio,
      alignment: this.state.alignment,
      location: this.state.location,
      skills: this.state.skills,
      origin: this.state.origin
    };

    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    let { errors } = this.state;
    // Set the select component's alignment options
    let options = [
      { label: "Select Moral Alignment (Required)", value: "" },
      { label: "Good (Lawful)", value: "Good - Lawful" },
      { label: "Good (Neutral)", value: "Good - Neutral" },
      { label: "Good (Chaotic)", value: "Good - Chaotic" },
      { label: "Neutral (Lawful)", value: "Neutral - Lawful" },
      { label: "Neutral", value: "Neutral" },
      { label: "Neutral (Chaotic)", value: "Neutral - Chaotic" },
      { label: "Evil (Lawful)", value: "Evil - Lawful" },
      { label: "Evil (Neutral)", value: "Evil - Neutral" },
      { label: "Evil (Chaotic)", value: "Evil - Chaotic" }
    ];
    const styles = {
      backgroundImage: `url(${require(`../../images/bgs/dashboard.jpg`)})`,
      backgroundSize: "cover",
      backgroundPosition: "center center"
    };
    return (
      <main style={styles} >
        <form className="profile-form">
          <section className="form-head">
            <h1>Edit Your Profile</h1>
          </section>
          <Input
            label="Profile Name"
            name="username"
            placeholder="(Required)"
            value={this.state.username}
            onChange={this.newValue}
            error={errors.username}
          />

          <Select
            label="Alignment"
            name="alignment"
            value={this.state.alignment}
            onChange={this.newValue}
            error={errors.alignment}
            options={options}
          />

          <Input
            label="Skills"
            name="skills"
            placeholder="List skills separated by commas (Required)"
            value={this.state.skills}
            onChange={this.newValue}
            error={errors.skills}
          />

          <Input
            label="Location"
            name="location"
            placeholder="Where's your HQ?"
            value={this.state.location}
            onChange={this.newValue}
          />

          <Input
            label="First Appearance"
            name="origin"
            placeholder="Where'd you make your debut?"
            value={this.state.origin}
            onChange={this.newValue}
          />

          <Textarea
            label="Bio"
            name="bio"
            placeholder="Give a brief description about yourself"
            value={this.state.bio}
            onChange={this.newValue}
          />
          <span onClick={this.submitForm}>
            <p>SUBMIT</p>
          </span>
        </form>
      </main>
    );
  }
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getOnlineProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

let mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getOnlineProfile }
)(withRouter(EditProfile));
