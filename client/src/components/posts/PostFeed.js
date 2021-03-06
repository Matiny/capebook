import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";
import Loading from "../common/loading";

class PostFeed extends Component {
  render() {
    let { posts } = this.props;
    
    return posts.map(post => <PostItem key={post._id} post={post} />);
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
