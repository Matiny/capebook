import React, { Component } from "react";

class ProfileStories extends Component {
  render() {
    let { profile } = this.props;
    let stories;

    if (profile.media) {
      stories = profile.media.map((story) => (
        <div className="story" key={story._id}>
          <p className="detail1">{story.title}</p>
          <p className="detail2">Format:<br/>{story.format}</p>
          <p className="detail3">Actor:<br/>{story.actor ? story.actor : "???"}</p>
          <p className="detail4">Release Year:<br/>{story.releaseyear}</p>
          <p className="detail5">Description: <br/>{story.description ? story.description : "No Description"}</p>
        </div>
      ));
    }

    return (
      <div>
        <div className="profile-padding" />
        <section className="stories">
          {stories}
        </section>
      </div>

    );
  }
}

export default ProfileStories;
