import "./payment.scss";

import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { commerce } from "../../lib/commerce";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);

const PaymentForm = ({
  price,
  shippingData,
  checkoutToken,
  onPaymentSubmit,
  onPaymentProcess,
  onRefresh,
}) => {
  const [order, setOrder] = useState({});

  const submitHandler = async (event, elements, stripe) => {
    event.preventDefault();

    if (!elements || !stripe) {
      return;
    }
    // loader modal will show until payment is successfull
    onPaymentProcess();

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      if (checkoutToken) {
        const orderData = {
          line_items: checkoutToken.live.line_items,
          customer: {
            firstname: shippingData.name,
            email: shippingData.email,
          },
          shipping: {
            name: shippingData.name,
            street: shippingData.address,
            town_city: shippingData.city,
            county_state: shippingData.state,
            postal_zip_code: shippingData.zipcode,
            country: shippingData.country,
          },
          fulfillment: {
            shipping_method: checkoutToken.shipping_methods[0].id,
          },
          payment: {
            gateway: "stripe",
            stripe: { payment_method_id: paymentMethod.id },
          },
        };

        try {
          const incomingOrder = await commerce.checkout.capture(
            checkoutToken.id,
            orderData
          );
          setOrder(incomingOrder);
          onRefresh();
          setOrder((latestOrder) => {
            return latestOrder;
          });
          if (order) onPaymentSubmit(order);

          console.log("Order successfull");
        } catch (response) {
          if (
            response.statusCode !== 402 ||
            response.data.error.type !== "requires_verification"
          ) {
            // Handle the error as usual because it's not related to 3D secure payments
            console.log(response);
            return;
          }

          let paymentErrorId = response.data.error.param;

          const cardActionResult = await stripe.handleCardAction(
            paymentErrorId
          );

          if (cardActionResult.error) {
            // The customer failed to authenticate themselves with their bank and the transaction has been declined
            alert(cardActionResult.error.message);
            return;
          }

          // Now we can try to capture the order again, this time passing the payment intent ID:
          try {
            const incomingOrder = await commerce.checkout.capture(
              checkoutToken.id,
              {
                ...orderData,
                payment: {
                  gateway: "stripe",
                  stripe: {
                    payment_intent_id: cardActionResult.paymentIntent.id,
                  },
                },
              }
            );

            setOrder(incomingOrder);
            onRefresh();
            setOrder((latestOrder) => {
              return latestOrder;
            });
            if (order) {
              onPaymentSubmit(order);
              console.log("Order successfull", order);
            }
          } catch (response) {
            console.log(response.message);
          }
        }
      }
    }
  };

  const cardElementOptions = { hidePostalCode: true };

  return (
    <div className="payment-box">
      <span className="text-subtitle">Payment</span>

      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => submitHandler(e, elements, stripe)}>
              <div className="input-box">
                <CardElement options={cardElementOptions} />
                <button
                  className="btn btn-primary text-subtitle"
                  disabled={!stripe}
                  type="submit"
                >
                  Pay {price}
                </button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default PaymentForm;
