import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/postActions";

import PostFeed from './PostFeed';
import Loading from "../common/loading";

class AllPosts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  constructor(props) {
    super(props);
    this.state = {
      number: Math.floor(Math.random() * 9) + 1
    };
  }
  render() {
    let { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Loading />;
    }
    else {
      postContent = <PostFeed posts={posts}></PostFeed>
    }
    const styles = {
      backgroundImage: `url(${require(`../../images/bgs/${
        this.state.number
      }.jpg`)})`
    };
    return (
      <main style={styles}>
        <div className="profile-padding" />
        <PostForm />
        {postContent}
      </main>
    );
  }
}

AllPosts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

let mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(AllPosts);
