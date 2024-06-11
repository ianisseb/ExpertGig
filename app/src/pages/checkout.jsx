// @ts-nocheck
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { CREATE_ORDER } from "../utils/constants";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useRouter } from "next/router";

const stripePromise = loadStripe(
  "pk_test_51PH2F7A2mjpe8xffWEHOE7ZiHx0u4Rrg4qyOkYiVGL8BEnrvPbae3RbRTnZBoo09ERr688KCCCS9VpQWQmEapgtM00M401wPHA"
);

function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();
  const { gigId } = router.query;
  useEffect(() => {
    const createOrderIntent = async () => {
      const { data } = await axios.post(
        CREATE_ORDER,
        { gigId },
        { withCredentials: true }
      );
      setClientSecret(data.clientSecret);
    };
    if (gigId) createOrderIntent();
  }, [gigId]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-[80vh] max-w-full mx-20 flex flex-col gap-10 items-center">
      <h1 className="text-3xl">
        Please complete the payment to place the order.
      </h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Checkout;
