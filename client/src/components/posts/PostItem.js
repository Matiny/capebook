import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

class PostItem extends Component {
  deleteClick = id => {
    this.props.deletePost(id);
  };

  onLike = id => {
    this.props.addLike(id);
  };

  unLike = id => {
    this.props.removeLike(id);
  };

  findUserLike = likes => {
    let { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    let { post, auth, showActions } = this.props;
    return (
      <div className="post-card-padding">
        <section className="post-item">
          <figure className="post-image">
            <img src={post.profilePic} alt="" />
          </figure>
          <figcaption>{post.name}</figcaption>
          <div className="post-text">
            <p>"{post.text}"</p>
          </div>
          {showActions ? (
            <div className="post-buttons">
              <Link to={`post/${post._id}`}>
                <span className="comment">
                  <p>Comments</p>
                </span>
              </Link>
              <span
                className="like"
                onClick={() => {
                  this.findUserLike(post.likes)
                    ? this.unLike(post._id)
                    : this.onLike(post._id);
                }}
              >
                <img
                  src={`${require(`../../images/svgs/${
                    this.findUserLike(post.likes)
                      ? "like.svg"
                      : "like-gray.svg"
                  }`)}`}
                  alt=""
                />
                <p>{post.likes.length}</p>
              </span>
              {/* <span className="dislike">
              <img src={`${require(`../../images/svgs/dislike.svg`)}`} alt=""/>
            </span> */}
              {post.user === auth.user.id ? (
                <span
                  className="delete"
                  onClick={() => {
                    this.deleteClick(post._id);
                  }}
                >
                  <p>X</p>
                </span>
              ) : null}
            </div>
          ) : null}
        </section>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

let mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
