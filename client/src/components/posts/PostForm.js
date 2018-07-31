import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Textarea from "../common/Textarea";
import { addPost } from "../../actions/postActions";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      // errors: {}
    };
  }

  submitPost = () => {
    let { user } = this.props.auth;
    let newPost = {
      text: this.state.text,
      name: user.name,
      profilePic: user.profilePic
    };
    this.props.addPost(newPost);
    this.setState({
      text: "",
      // errors: {}
     });
  };

  //Set text values to state
  newValue = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    let { errors } = this.props;
    return (
      <div>
        <h1 className="post-h1">Join the Discussion</h1>
        <section className="post-card">
          <Textarea
            label="Make a Post"
            name="text"
            placeholder="What's on your mind?"
            value={this.state.text}
            onChange={this.newValue}
            error={errors.text}
          />
          <span onClick={this.submitPost} className="submit-post">
            <p>SUBMIT</p>
          </span>
        </section>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

let mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
