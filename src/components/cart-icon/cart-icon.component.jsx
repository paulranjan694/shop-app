import React from 'react';
import { connect } from 'react-redux';

import {ReactComponent as ShopingIcon} from '../../assets/shopping-bag.svg';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemCounts } from '../../redux/cart/cart.selectors';

import './cart-icon.styles.scss';

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShopingIcon className='shoping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

// const mapStateToProps = (state) => ({
//     itemCount : selectCartItemCounts(state)
// })

const mapStateToProps = (state) => {
    console.log('item count...');
    return {
        itemCount : selectCartItemCounts(state)
    }
}

//*********** can write like this also *************
// const mapStateToProps = ({cart : {cartItems}}) => {
//     return {
//         itemCount : cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
//     }
// }


export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);