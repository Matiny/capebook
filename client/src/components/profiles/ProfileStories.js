import React, { Component } from "react";

class ProfileStories extends Component {
  render() {
    let { profile } = this.props;
    let stories;

    if (profile.media) {
      stories = profile.media.map((story) => (
        <div className="story" key={story._id}>
          <strong className="detail1">{story.title}</strong>
          <p className="detail2">Format:<br/>{story.format}</p>
          <p className="detail3">Actor:<br/>{story.actor ? story.actor : "???"}</p>
          <p className="detail4">Release Year:<br/>{story.releaseyear}</p>
          <p className="detail5">Description:<br/>{story.description ? story.description : "No Description"}</p>
        </div>
      ));
    }

    return (
      <div>
        <div className="smaller-padding" />
        <section className="stories">
          <h1 className="appearance">Other Appearances</h1>
          {stories}
        </section>
      </div>

    );
  }
}

export default ProfileStories;
