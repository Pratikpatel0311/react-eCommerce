import React from 'react';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

function Header({currentUser, hidden}) {
    return (
      <div className="header">
        <Link to="/" className="logo-container">
          <Logo className="logo" />
        </Link>
        <div className="options">
          <Link to="/shop" className="option">
            SHOP
          </Link>
          <Link to="/contact" className="option">
            CONTACT
          </Link>
          {
            currentUser ?
              <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
              :
              <Link className="option" to="/signin">SIGN IN</Link>
          }
          <CartIcon />
        </div>
        {
          hidden?null:<CartDropdown />
        }
      </div>
    );
}

const mapStateToProps = ({user:{currentUser},cart:{hidden}}) => ({
  currentUser,
  hidden
});

//connect is higher order accepting two arguments one to map states with props
export default connect(mapStateToProps)(Header);
