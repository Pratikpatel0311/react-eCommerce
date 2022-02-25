import React, { useState } from 'react';
import {connect} from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

const SignIn = ({emailSignInStart,googleSignInStart}) => {
  
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
  
  const { email, password } = userCredentials;

    const handleSubmit = async event => { 
      event.preventDefault();

      emailSignInStart(email, password);
    };

    const handleChange = event => {
        const { value, name } = event.target;

        //Dynamically set vaue to input field
      setUserCredentials({ ...userCredentials, [name]: value });
    }

    return (
      <div className="sign-in">
        <h1 className='title'>I already have an account</h1>
        <span>Sign in using your email and password</span>

        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            label="Email"
            value={email}
            handleChange={handleChange}
            required
          />

          <FormInput
            type="password"
            name="password"
            label="Password"
            value={password}
            handleChange={handleChange}
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

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);
