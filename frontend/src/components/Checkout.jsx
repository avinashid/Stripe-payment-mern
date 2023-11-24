import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import { useSelector } from "react-redux";

export const Checkout = ({ stripePromise }) => {
  const data = useSelector((state) => state.userDataSlice);
  const navigate = useNavigate();
  console.log(data);
  if (!data.name) navigate("/");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const res = await axios.post(
          "https://stripe-payment-mern.onrender.com/create-checkout-session",
          {
            userData: data,
          }
        );
        const response = res.data;
        setClientSecret(response.clientSecret);
      } catch (error) {
        console.log(error.message), navigate("/");
      }
    };
    fetchCheckout();
  }, []);

  return (
    <div
      id="checkout"
      className="h-screen align-middle self-center flex  flex-col"
    >
      {clientSecret && data.name && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};
