// import React from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import { ProductCheckoutForm } from './ProductCheckoutForm';

// const PUBLIC_KEY = "pk_test_51KSF1sDd4Y8fNsneyb3HEF9cF41EK2aSyFTrbEowWOsUiSVb5NZNmDTYhfBPmyw7US7slf8Nugr6Yvv2OuUVnUD400dZgF2mkj";

// const stripeTestPromise = loadStripe(PUBLIC_KEY);

// const ProductPayment = (props) => {
//   const { productId, title, amount } = useParams();
//   return (
//     <Elements stripe={stripeTestPromise}>
//       <ProductCheckoutForm productId={productId} title={title} amount = {amount} />
//     </Elements>
//   );
// };

// export default ProductPayment;