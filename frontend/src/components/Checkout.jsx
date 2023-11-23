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
      const res = await axios.post(
        "http://localhost:5000/create-checkout-session",
        {
          userData: data,
        }
      );
      if (res.status === 500) navigate("/");
      const response = res.data;
      setClientSecret(response.clientSecret);
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
