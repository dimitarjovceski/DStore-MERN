import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="container mt-10 ">
      <ProgressSteps step1 step2 />
      <div className="flex justify-around items-center mt-[5rem]">
        <form onSubmit={handleSubmit} className="w-[40rem]">
          <h1 className="text-3xl text-white mb-5">Shipping</h1>
          <div className="mb-4">
            <label className="block  text-white mb-1">Address</label>
            <input
              type="text"
              className="w-full rounded bg-black text-white p-2 border "
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block  text-white mb-1">City</label>
            <input
              type="text"
              className="w-full rounded bg-black text-white p-2 border "
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block  text-white mb-1">Postal Code</label>
            <input
              type="text"
              className="w-full rounded bg-black text-white p-2 border "
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block  text-white mb-1">Country</label>
            <input
              type="text"
              className="w-full rounded bg-black text-white p-2 border "
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block  text-white mb-1">Select method</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-red-500"
                  name="paymentMethod"
                  value="Paypal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <span className="ml-2 text-green-500">
                  PayPal or Credit Cart
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="py-2 px-4 bg-green-500 text-white opacity-85 hover:opacity-100 text-lg w-full rounded-full"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
