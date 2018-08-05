import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import Input from "../common/Input";
import "../../css/auth.min.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      number: Math.floor(Math.random() * 8) + 1
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      //Redirect the logged user from accessing this component
      this.props.history.push("/dashboard");
    }
  }

  // When new props come in, redirect to dashboard
  componentDidUpdate() {
     const { isAuthenticated } = this.props.auth;
     if (isAuthenticated) {
       this.props.history.push("/dashboard");
     }
   }

  //Set text values to state
  newValue = e => this.setState({ [e.target.name]: e.target.value });

  submitForm = () => {
    const newUser = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(newUser);
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
        <form action="" className="login">
          <h1>Back to Battle</h1>

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

          <span onClick={this.submitForm}>
            <p>SUBMIT</p>
          </span>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth, // <-- state.auth comes from the rootReducer
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
