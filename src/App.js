import React, {useEffect} from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import HomePage from "./pages/homepage/homepage.component";
import { Route, Routes, Navigate } from "react-router-dom";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Shop from "./pages/shop/shop.component";
import CheckoutPage from './pages/checkout/checkout.component';

import Header from "./components/header/header.component";

import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.actions";

import "./App.css";

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession()
  },[checkUserSession]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop//*" element={<Shop />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/signin"
          element={currentUser ? <Navigate to="/" /> : <SignInAndSignUpPage />}
        />
      </Routes>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: ()=>dispatch(checkUserSession()), 
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
