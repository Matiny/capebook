import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteMedia } from "../../actions/profileActions";

class Media extends Component {
  deleteStory = id => {
    this.props.deleteMedia(id)
  };
  render() {
    let media = this.props.media.map(story => (
      <tr key={story._id}>
        <td>{story.title}</td>
        <td>{story.format}</td>
        <td>{story.releaseyear}</td>
        <td>
          <span className="delete-media" onClick={() => this.deleteStory(story._id)}>
            <p>Delete Story</p>
          </span>
        </td>
      </tr>
    ));

    return (
      <div>
        <table className="table">
          <caption>Featured Stories</caption>
          <thead>
            <tr>
              <th>Title</th>
              <th>Format</th>
              <th>Release Year</th>
              <th />
            </tr>
          </thead>
          <tbody>{media}</tbody>
        </table>
      </div>
    );
  }
}

Media.propTypes = {
  deleteMedia: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteMedia }
)(Media);
