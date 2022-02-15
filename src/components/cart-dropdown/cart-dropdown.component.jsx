import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import CustomButton from '../custom-button/custom-button.component';

import withRouter from '../withRouter.component';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, router, dispatch }) => {

    return (
      <div className="cart-dropdown">
        <div className="cart-items">
          {cartItems.length ? (
            cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} item={cartItem} />
            ))
          ) : (
            <span className="empty-message">Your cart is empty</span>
          )}
        </div>
        <CustomButton onClick={() => {
          router.navigate("/checkout");
          dispatch(toggleCartHidden())
        }}>
          GO TO CHECKOUT
        </CustomButton>
      </div>
    );
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));