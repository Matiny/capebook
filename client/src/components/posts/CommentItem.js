import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  onDeleteComment = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };

  render() {
    let { comment, postId, auth } = this.props;
    return (
      <div className="post-card-padding">
        <section className="post-item">
          <figure className="post-image">
            <img src={comment.profilePic} alt="" />
          </figure>
          <figcaption>{comment.name}</figcaption>
          <div className="post-text">
            <p>"{comment.text}"</p>
          </div>
          <div className="post-buttons">
            {comment.user === auth.user.id ? (
              <span
                className="delete-comment"
                onClick={() => this.onDeleteComment(postId, comment._id)}
              >
                <p>X</p>
              </span>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

let mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
