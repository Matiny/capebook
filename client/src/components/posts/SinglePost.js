import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPost } from "../../actions/postActions";

// Components
import PostItem from "./PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import Loading from "../common/loading";

class SinglePost extends Component {
  componentDidMount() {
    // Get this post's info by id
    this.props.getPost(this.props.match.params.id);
  }

  constructor(props) {
    super(props);
    this.state = {
      number: Math.floor(Math.random() * 9) + 1
    };
  }
  render() {
    const styles = {
      backgroundImage: `url(${require(`../../images/bgs/${
        this.state.number
      }.jpg`)})`
    };
    let { post, loading } = this.props.post;
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Loading />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments}/>
        </div>
      );
    }
    return (
      <main style={styles}>
        <div className="profile-padding" />
        <h1 className="post-h1">{post.name}'s Post</h1>
        {postContent}
      </main>
    );
  }
}

SinglePost.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

let mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(SinglePost);
