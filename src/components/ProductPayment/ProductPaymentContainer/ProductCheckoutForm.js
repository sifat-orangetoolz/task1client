// import React from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axios from "axios";

// export const ProductCheckoutForm = (props) => {

//   const {productId, title, amount } = props;

//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardElement),
//     });

//     if (!error) {
//       console.log("Stripe 20 | token generated!", paymentMethod);
//       try {
//         const { id } = paymentMethod;
//         const response = await axios.post(
//           "http://localhost:5000/payment/product/create-product-payment",
//           {
//             productId: productId,
//             title: title,
//             amount: amount,
//             id: id,
//             userId: localStorage.getItem('id')
//           }
//         );
//         console.log(response)

//         console.log("Stripe 35 | data", response.data.success);
//         if (response.data.success) {
//           alert("Payment Successful and Billing done")
//         }
//       } catch (error) {
//         console.log("ProductCheckoutForm.js 40 | ", error);
//       }
//     } else {
//        alert(error.message)
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
//       <CardElement />
//       <button>Pay</button>
//     </form>
//   );
// };