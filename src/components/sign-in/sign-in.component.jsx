import React, { Component } from 'react';
import {connect} from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state={
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => { 
      event.preventDefault();
      const {emailSignInStart} = this.props;
      const { email, password } = this.state;

      emailSignInStart(email, password);
    };

    handleChange = event => {
        const { value, name } = event.target;

        //Dynamically set vaue to input field
        this.setState({[name]: value});
    }

  render() {
    const {googleSignInStart} = this.props;
    return (
      <div className="sign-in">
        <h1 className='title'>I already have an account</h1>
        <span>Sign in using your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            label="Email"
            value={this.state.email}
            handleChange={this.handleChange}
            required
          />

          <FormInput
            type="password"
            name="password"
            label="Password"
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />

          <div className="buttons">
            <CustomButton type="submit"> Sign In </CustomButton>
            <CustomButton
              type="button"
              onClick={googleSignInStart}
              isGoogleSignIn
            >
              {" "}
              Sign in with Google{" "}
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);
