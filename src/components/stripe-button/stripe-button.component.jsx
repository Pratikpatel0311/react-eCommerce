import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey =
        "pk_test_51H1rnyBOCzaVsb57pMTrWcEPG5gbiWj5upY6dVekepPA1C6SAzREunAEMhk8fSXIMI5YSyMw3QTIaHc5DQCCBEEF00x5h4516c";
    
    const onToken = token => {
        console.log(token);
        alert("Payment Successful");
    }
    
    return <StripeCheckout
        label="Pay Now"
        name="Crown Clothing"
        billingAddress
        shippingAddress
        image="https://svgshare.com/i/CUz.svg"
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel="Pay Now"
        token={onToken}
        stripeKey={publishableKey}
    />
};

export default StripeCheckoutButton;