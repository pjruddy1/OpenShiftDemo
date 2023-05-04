import { useState } from "react";
import { useSelector } from 'react-redux';
import "./BillingShipping.css";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { POAPI } from "api/purchaseOrder";
import { CartAPI } from "api/cart";

export function BillingShipping(props) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [state, setState] = useState({
    shippingFirstName: "",
    shippingLastName: "",
    shippingEmail: "",
    shippingPhone: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingZipCode: "",
  });

    
  const cart = useSelector((state) => state.cartSlice); // Get the current cart from the Redux store
  const userName = `${state.shippingFirstName} ${state.shippingLastName}`;
  const userAddress = `${state.shippingAddress} ${state.shippingCity} ${state.shippingState} ${state.shippingZipCode}`;
  
  const total = cart.total;
  const cartId = cart.cartId

  const orderData = {
    userAddress,
    userName,
    total,
    cartId,
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const validationResult = validateInputs();
    if (!validationResult.valid) {
      alert(validationResult.message);
      return;
    }
  
    if (!stripe || !elements) {
      return;
    }

    if (window.confirm("Continue with transaction?")){
      completeTransaction();
    } else{
      return;
    }
  }

  function validateInputs() {
    const requiredFields = [
      "shippingFirstName",
      "shippingLastName",
      "shippingEmail",
      "shippingPhone",
      "shippingAddress",
      "shippingCity",
      "shippingState",
      "shippingZipCode",
    ];
    
    for (const field of requiredFields) {
      if (!state[field]) {
        return { valid: false, message: `${field} is required` };
      }
    }
    return { valid: true };
  }


  async function completeTransaction(){
    const cardElement = elements.getElement(CardElement);
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
  
    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      // Process the payment here, e.g., by sending the paymentMethod.id to your server
      handlePurchaseOrder();
    }
  }

  async function handlePurchaseOrder() {
    let errors = [];
  
    const addProductPromises = cart.cartList.flatMap((item) => {
      // Create an array of promises for each item based on its count
      const itemPromises = Array.from({ length: item.count }, async () => {
        try {
          await CartAPI.addProduct(item, cart);
        } catch (error) {
          errors.push(`Failed to add product with ID ${item.id}: ${error.message}`);
        }
      });
  
      return itemPromises;
    });
  
    // Wait for all the addProduct calls to complete
    await Promise.all(addProductPromises);
  
    if (errors.length > 0) {
      // Handle the errors (e.g., display them to the user)
      console.error("Some products were not added successfully:");
      errors.forEach((error) => console.error(error));
    } else {
      await POAPI.createPurchaseOrder(orderData);

      console.log(orderData);

      navigate('/confirmation', {
        state: {
          orderData: orderData,
          cartList: cart.cartList,
        },
      });
    }
  }
  

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="billing-shipping-form">
      <form onSubmit={handleSubmit}>
        <h1>Shipping Address</h1>
        <input
          className="input-font"
          type="text"
          name="shippingFirstName"
          placeholder="First Name"
          autoComplete="{false}"
          onChange={onChange}
        />
        <input
          className="input-font"
          type="text"
          name="shippingLastName"
          placeholder="Last Name"
          autoComplete="{false}"
          onChange={onChange}
        />
        <input
          className="input-font"
          type="text"
          name="shippingEmail"
          placeholder="Email"
          autoComplete="{false}"
          onChange={onChange}
        />
        <input
          className="input-font"
          type="text"
          name="shippingPhone"
          placeholder="Phone Number"
          autoComplete="{false}"
          onChange={onChange}
        />
        <input
          className="input-font"
          type="text"
          name="shippingAddress"
          placeholder="Address"
          autoComplete="{false}"
          onChange={onChange}
        />
        <input
          className="input-font"
          type="text"
          name="shippingCity"
          placeholder="City"
          autoComplete="{false}"
          onChange={onChange}
        />
        <input
          className="input-font"
          type="text"
          name="shippingState"
          placeholder="State"
          autoComplete="{false}"
          onChange={onChange}
        />
        <input
          className="input-font"
          type="text"
          name="shippingZipCode"
          placeholder="Zip Code"
          autoComplete="{false}"
          onChange={onChange}
        />
        <h1>Billing Address</h1>
        <div className="s.form_input">
          <label htmlFor="checkbox">Same as shipping address</label>
          <input
            type="checkbox"
            value="false"
            name="checkbox"
            onChange={() => setCheck(!check)}
          />
        </div>
        <input
          className="input-font"
          type="text"
          name="billingFirstName"
          placeholder="First Name"
          autoComplete="{false}"
          value={check ? state.shippingFirstName : ""}
          onChange={onChange}
        />
        <input
          className="input-font"
          type="text"
          name="billingLastName"
          placeholder="Last Name"
          autoComplete="{false}"
          value={check ? state.shippingLastName : ""}
          onChange={onChange}
        />
        <input
          className="input-font"
          type="text"
          name="billingEmail"
          placeholder="Email"
          autoComplete="{false}"
          value={check ? state.shippingEmail : ""}
          onChange={onChange}
        />
        <input
          className="input-font"
          type="text"
          name="billingPhone"
          placeholder="Phone Number"
          autoComplete="{false}"
          value={check ? state.shippingPhone : ""}
          onChange={onChange}
        />
        <input
          className="input-font"
          type="text"
          name="billingAddress"
          placeholder="Address"
          autoComplete="{false}"
          value={check ? state.shippingAddress : ""}
          onChange={onChange}
        />
        <input
          className="input-font"
          type="text"
          name="billingCity"
          placeholder="City"
          autoComplete="{false}"
          value={check ? state.shippingCity : ""}
          onChange={onChange}
        />
        <input
          className="input-font"
          type="text"
          name="billingState"
          placeholder="State"
          autoComplete="{false}"
          value={check ? state.shippingState : ""}
          onChange={onChange}
        />
        <input
          className="input-font"
          type="text"
          name="billingZipCode"
          placeholder="Zip Code"
          autoComplete="{false}"
          value={check ? state.shippingZipCode : ""}
          onChange={onChange}
        />
       <h1>Payment Information</h1>
        <div className="s.form_input">
          <CardElement />
        </div>

        <input type="submit" className="btn" value="Submit" disabled={!stripe} />
    </form>
    </div>
  );
}
