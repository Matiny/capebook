import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addMedia } from "../../actions/profileActions";

class AddMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      format: "",
      releaseyear: "",
      actor: "",
      description: "",
      number: Math.floor(Math.random() * 9) + 1
    };
  }

  //Set text values to state
  newValue = e => this.setState({ [e.target.name]: e.target.value });

  submitForm = () => {
    let mediaData = {
      title: this.state.title,
      format: this.state.format,
      releaseyear: this.state.releaseyear,
      actor: this.state.actor,
      description: this.state.description
    };

    this.props.addMedia(mediaData, this.props.history);
  };
  render() {
    const styles = {
      backgroundImage: `url(${require(`../../images/bgs/dashboard.jpg`)})`,
      backgroundSize: "cover",
      backgroundPosition: "center center"
    };

    let { errors } = this.props;

    return (
      <main style={styles}>
        <form className="profile-form">
          <section className="form-head">
            <h1>Add a Story</h1>
          </section>
          <Input
            label="Title"
            name="title"
            placeholder="(Required)"
            value={this.state.title}
            onChange={this.newValue}
            error={errors.title}
          />
          <Input
            label="Format"
            name="format"
            placeholder="Comic Book, Video Game, etc. (Required)"
            value={this.state.format}
            onChange={this.newValue}
            error={errors.format}
          />
          <Input
            label="Release Year"
            name="releaseyear"
            placeholder="(Required)"
            value={this.state.releaseyear}
            onChange={this.newValue}
            error={errors.releaseyear}
          />
          <Input
            label="Actor"
            name="actor"
            placeholder="Who portrayed your character?"
            value={this.state.actor}
            onChange={this.newValue}
          />
          <Textarea
            label="Description"
            name="description"
            placeholder="Give a brief description of the story"
            value={this.state.description}
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

AddMedia.PropTypes = {
  addMedia: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

let mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addMedia }
)(withRouter(AddMedia));
