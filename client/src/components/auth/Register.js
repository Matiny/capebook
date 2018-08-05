import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import Input from "../common/Input";
import { withRouter } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      profilePic: "",
      number: Math.floor(Math.random() * 8) + 1
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      //Redirect the logged user from accessing this component
      this.props.history.push("/dashboard");
    }
  }

  //Set input values to state
  newValue = e =>
    this.setState({
      [e.target.name]: e.target.value
    });
  submitForm = () => {
    //Make the user, and then...
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      profilePic: this.state.profilePic
    };

    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    //Random bg image on refresh
    const styles = {
      backgroundImage: `url(${require(`../../images/bgs/${
        this.state.number
      }.jpg`)})`,
      backgroundSize: "cover",
      backgroundPosition: "center center"
    };
    //Error checking variable
    let { errors } = this.props;

    return (
      <main style={styles} className="index">
        <form action="" className="register">
          <h1>Recruitment</h1>

          <Input
            label="Name"
            name="name"
            placeholder="2 to 20 characters"
            value={this.state.name}
            onChange={this.newValue}
            error={errors.name}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter valid address"
            value={this.state.email}
            onChange={this.newValue}
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="6 to 30 characters"
            value={this.state.password}
            onChange={this.newValue}
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            type="password"
            name="password2"
            placeholder="Repeat 6 to 30 characters"
            value={this.state.password2}
            onChange={this.newValue}
            error={errors.password2}
          />

          <Input
            label="Profile Picture"
            name="profilePic"
            placeholder="Enter a URL"
            value={this.state.profilePic}
            onChange={this.newValue}
            error={errors.profilePic}
          />

          <span onClick={this.submitForm}>
            <p>SUBMIT</p>
          </span>
        </form>
      </main>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth, // <-- state.auth comes from the rootReducer
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
