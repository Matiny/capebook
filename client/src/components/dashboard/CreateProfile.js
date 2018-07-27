import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { createProfile } from "../../actions/profileActions";

// Components
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Select from "../common/Select";
import DropZone from "react-dropzone";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      username: "",
      bio: "",
      realname: "",
      alignment: "",
      location: "",
      skills: "",
      origin: "",
      profilePic: "",
      number: Math.floor(Math.random() * 9) + 1
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  //Set text values to state
  newValue = e => this.setState({ [e.target.name]: e.target.value });

  submitForm = () => {

    let profileData = {
      username: this.state.username,
      bio: this.state.bio,
      realname: this.state.realname,
      alignment: this.state.alignment,
      location: this.state.location,
      skills: this.state.skills,
      origin: this.state.origin,
      profilePic: this.state.profilePic
    }

    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    let { errors } = this.state;
    // Set the select component's alignment options
    let options = [
      { label: "Select Moral Alignment (Required)", value: "" },
      { label: "Good (Lawful)", value: "Good (Lawful)" },
      { label: "Good (Neutral)", value: "Good (Neutral)" },
      { label: "Good (Chaotic)", value: "Good (Chaotic)" },
      { label: "Neutral (Lawful)", value: "Neutral (Lawful)" },
      { label: "Neutral", value: "Neutral" },
      { label: "Neutral (Chaotic)", value: "Neutral (Chaotic)" },
      { label: "Evil (Lawful)", value: "Evil (Lawful)" },
      { label: "Evil (Neutral)", value: "Evil (Lawful)" },
      { label: "Evil (Chaotic)", value: "Evil (Chaotic)" }
    ];
    const styles = {
      backgroundImage: `url(${require(`../../images/bgs/${
        this.state.number
      }.jpg`)})`,
      backgroundSize: "cover",
      backgroundPosition: "center center"
    };
    return (
      <main style={styles} className="form-page">
        <form className="profile-form">
          <section className="form-head">
            <h1>Create Your Profile</h1>
          </section>

          <Input
            label="Real Name"
            name="realname"
            placeholder="Reveal your secret identity"
            value={this.state.realname}
            onChange={this.newValue}
          />

          <Input
            label="Profile Picture"
            name="profilePic"
            placeholder="Enter a URL"
            value={this.state.profilePic}
            onChange={this.newValue}
            error={errors.profilePic}
          />

          <Input
            label="User Name"
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
            placeholder="Where are you based?"
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

          <section className="submit-form">
            <span onClick={this.submitForm}>
              <p>SUBMIT</p>
            </span>
          </section>
        </form>
      </main>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

let mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
