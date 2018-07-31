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
  constructor(props) {
    super(props);
    this.state = {
      number: Math.floor(Math.random() * 9) + 1
    };
  }
  componentDidMount() {
    // Get this post's info by id
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const styles = {
      backgroundImage: `url(${require(`../../images/bgs/${
        this.state.number
      }.jpg`)})`
    };
    let { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading || Object.keys(posts).length === 0) {
      postContent = <Loading />;
    } else {
      postContent = (
        <div>
          <PostItem post={posts} showActions={false} />
          <CommentForm postId={posts._id} />
          <CommentFeed postId={posts._id} comments={posts.comments}/>
        </div>
      );
    }
    return (
      <main style={styles}>
        <div className="profile-padding" />
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
