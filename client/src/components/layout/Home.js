import React, { Component } from "react";
import logo from "../../images/svgs/cb-logo-new.svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";


class Home extends Component {
  constructor() {
    super();
    this.state = {
      number: Math.floor(Math.random() * 8) + 1
    };
  }
  render() {
    let { isAuthenticated } = this.props.auth;

    /*By filtering Deadpool's wallpaper outta the
    Home component with no login, we avoid the awkwardness
    of a weird 1st impression*/
    let deadPoolBonus = isAuthenticated ?
    1 : 0;

    //Random bg image on refresh
    const styles = {
      backgroundImage: `url(${require(`../../images/bgs/${
        this.state.number + deadPoolBonus
      }.jpg`)})`
    };

    let guestLinks = (
      <div className="buttons">
        <Link to="/login" className="link">
          <span>
            <p>Sign In</p>
          </span>
        </Link>

        <Link to="/register" className="link">
          <span>
            <p>Sign Up</p>
          </span>
        </Link>
      </div>
    );

    let authLinks = (
      <div className="buttons">
        <Link to="/dashboard" className="link">
          <span className="dashboard-button">
            <p>View Dashboard</p>
          </span>
        </Link>
      </div>
    );

    return (
      <main style={styles}>
        <img src={logo} alt="" className="logo" />
        <h1 className="subtitle">ALL YOUR FAVORITE CHARACTERS, IN ONE PLACE</h1>
        {isAuthenticated ? authLinks : guestLinks}
      </main>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

let mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
