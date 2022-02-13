import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { CheckoutForm } from './CheckoutForm';

const PUBLIC_KEY = "pk_test_51KSF1sDd4Y8fNsneyb3HEF9cF41EK2aSyFTrbEowWOsUiSVb5NZNmDTYhfBPmyw7US7slf8Nugr6Yvv2OuUVnUD400dZgF2mkj";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripePayment = (props) => {
  const { packageId, title, amount, validity} = useParams();
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm packageId={packageId} title={title} amount = {amount} validity={validity} />
    </Elements>
  );
};

export default StripePayment;