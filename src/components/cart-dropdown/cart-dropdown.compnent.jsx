import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createStructuredSelector } from "reselect";

import { selectCartItems } from "../../redux/cart/cart.selectors";
import CartItem from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems, history, dispatch }) => (
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
        history.push('/checkout');
        dispatch(toggleCartHidden())
      }}>GO TO CHECKOUT</CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropdown));


/*
whenever we connect our app with "connet()", 
we will get "dispatch" as a props, 
so we used dispatch directly, instead of mapDispatchToProps

1. const CartDropdown = ({ cartItems, history, dispatch }) => (
2.  <CustomButton onClick={() => {
        history.push('/checkout');
        dispatch(toggleCartHidden())
      }}>GO TO CHECKOUT</CustomButton>
*/
