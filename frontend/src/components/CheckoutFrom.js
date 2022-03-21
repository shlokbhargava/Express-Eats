import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Button, Form } from "react-bootstrap";
import Message from "./Message";

const CheckoutForm = ({ order }) => {
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState(null)
  const [variant, setVariant] = useState('danger')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!")
          setVariant('success')
          break;
        case "processing":
          setMessage("Your payment is processing.")
          setVariant('warning')
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.")
          setVariant('danger')
          break;
        default:
          setMessage("Something went wrong.")
          setVariant('danger')
          break;
      }
    })
  }, [stripe])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `https://expresseats.herokuapp.com/order/${order._id}`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message)
      setVariant('danger')
    } else {
      setMessage("An unexpected error occured.")
      setVariant('danger')
    }

    setIsLoading(false);
  }

  return (
    <>
      <Form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <Button className='stripe-button' disabled={isLoading || !stripe || !elements} type="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </Button>
      </Form>
      { message && <Message variant={variant}> {message} </Message> }
    </>
  );
}

export default CheckoutForm