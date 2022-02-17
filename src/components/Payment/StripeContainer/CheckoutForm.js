import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export const CheckoutForm = (props) => {

  const {packageId, title, amount, validity} = props;

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const decoded = jwt_decode(localStorage.getItem('token'));

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
        const response = await axios.post(
          "http://localhost:5000/payment/create-payment",
          {
            packageId: packageId,
            title: title,
            amount: amount,
            validity: validity,
            id: id,
            userId: decoded.id
          }
        );
        console.log(response)

        console.log("Stripe 36 | data", response.data.success);
        if (response.data.success) {
          alert("Payment Successful and Billing done");
          history.push('/dashboard');

        }
      } catch (error) {
        console.log("CheckoutForm.js 41 | ", error);
      }
    } else {
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