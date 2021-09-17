import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {

    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JUC3YSCtmnY3f9tIah3KmIL87zEzauWl8EAXbcaTX5XbCg0QVYWLu2ZtQRMIgZV5g4KnHnrkkq0wgqmbPvpXgLn00eW91sqaI' ;

    const onToken = token => {
        console.log(token);
        alert('Payment Successfull!!')
    }
    
    return (
        <StripeCheckout
            label='Pay Now'
            name = 'Shop App'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description = {`Your total is $${price}`}
            amount = {priceForStripe}
            token={onToken}
            stripeKey={publishableKey}
        />
    );

};

export default StripeCheckoutButton;
