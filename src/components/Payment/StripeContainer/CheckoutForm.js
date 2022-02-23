import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useHistory } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';
import rootApiPost from '../../api/rootApiPost';

export const CheckoutForm = (props) => {

  const {packageId, title, amount, validity} = props;

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  // const decoded = jwt_decode(localStorage.getItem('token'));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 20 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;

        const paymentObject = {
          packageId: packageId,
          title: title,
          amount: amount,
          validity: validity,
          id: id
        }
        console.log(paymentObject)

        fetch('http://localhost:5000/payment/create-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 
          'authorization': `bearer ${localStorage.getItem('token')}`    
          },
          body: JSON.stringify(paymentObject)
       })
        .then((res) => res.json())
        .then((result) => {
        console.log("Stripe 36 | data", result.data.success);
        if (result.data.success) {
          alert("Payment Successful and Billing done");
          history.push('/dashboard');

        }
        else{
          alert('Payment not done')
        }
      
      })
    }
    catch (error) {
        console.log("CheckoutForm.js 59 | ", error);
      }
    }
     else {
      alert(error.message)
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <CardElement />
      <button>Pay</button>
    </form>
  );
};