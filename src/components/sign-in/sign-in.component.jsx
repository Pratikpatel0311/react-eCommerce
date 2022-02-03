import React, { Component } from 'react';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import FormInput from '../form-input/form-input.component';
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
      
      const { email, password } = this.state;

      try {
        // Sign In using email and password
        await auth.signInWithEmailAndPassword(email, password);
        this.setState({ email: "", password: "" });
      } catch (error) {
        console.log(error);
      }

    };

    handleChange = event => {
        const { value, name } = event.target;

        //Dynamically set vaue to input field
        this.setState({[name]: value});
    }

  render() {
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
              onClick={signInWithGoogle}
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

export default SignIn;
