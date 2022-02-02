import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Route, Routes } from 'react-router-dom';
import Shop from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './components/firebase/firebase.utils';
import react from 'react';

class App extends react.Component {
  
  constructor() {
    super();

    this.state = {
      currentUser: null,
    }
  }

  unsubscribeFromAuth = null;

  //Open subscription methos to know the current status of authentication
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
      console.log(user);
    });
  }

  //Unsubscribe from auth methods
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/signin" element={<SignInAndSignUpPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
