import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Route, Routes } from 'react-router-dom';
import Shop from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import react from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends react.Component {

  unsubscribeFromAuth = null;

  //Open subscription methos to know the current status of authentication
  componentDidMount() {

  const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        //Store actual user in DB
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          // Getting data from snapshot and assign it to state variable
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
          });

        });
      }

      //Set the state to null if userAuth is null
      setCurrentUser(userAuth);
    });
  }

  //Unsubscribe from auth methods
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  
  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/signin" element={<SignInAndSignUpPage />} />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser:user=>dispatch(setCurrentUser(user))
});

export default connect(null,mapDispatchToProps)(App);
