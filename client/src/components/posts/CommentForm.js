import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Textarea from "../common/Textarea";
import { addComment } from "../../actions/postActions";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
      // errors: {}
    };
  }

  submitComment = () => {
    let { user } = this.props.auth;
    let { postId } = this.props;

    let newComment = {
      text: this.state.text,
      name: user.name,
      profilePic: user.profilePic
    };
    this.props.addComment(newComment, postId);
    this.setState({
      text: ""
      // errors: {}
    });
  };

  //Set text values to state
  newValue = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    let { errors } = this.props;
    return (
      <div>
        <section className="post-card">
          <Textarea
            label="Make a Comment"
            name="text"
            placeholder="Reply to this post"
            value={this.state.text}
            onChange={this.newValue}
            error={errors.text}
          />
          <span onClick={this.submitComment} className="submit-post">
            <p>SUBMIT</p>
          </span>
        </section>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

let mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
