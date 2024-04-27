import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { toast } from "react-toastify";
import ProgressSteps from "../../components/ProgressSteps";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import Loader from "../../components/Loader";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, navigate, cart.shippingAddress.address]);

  const submitOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      toast.success("Order successfully completed");
      dispatch(clearCartItems());
       navigate("/order-result");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto mt-8">
        {cart?.cartItems.length === 0 ? (
          <span className="text-2xl font-bold text-white">
            Your cart is empty
          </span>
        ) : (
          <div className="overflow-x-auto px-[8rem]">
            <table className="w-full border-collapse text-white">
              <thead>
                <tr>
                  <td className="px-1 py-2 text-left align-top">Image</td>
                  <td className="px-1 py-2 text-left align-top">Product</td>
                  <td className="px-1 py-2 text-left align-top">Quantity</td>
                  <td className="px-1 py-2 text-left align-top">Price</td>
                  <td className="px-1 py-2 text-left align-top">Total</td>
                </tr>
              </thead>

              <tbody>
                {cart?.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>

                    <td className="p-2">
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </td>

                    <td className="p-2">{item.quantity}</td>

                    <td className="p-2">${item.price}</td>

                    <td className="p-2">
                      ${(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8 ml-[5rem]">
              <h2 className="text-2xl font-semibold mb-5 text-white">
                Order Summary
              </h2>
              <div className="flex justify-between flex-wrap p-8 rounded-md  bg-black text-white">
                <ul className="text-lg">
                  <li>
                    <span>Total Items:</span> $ {cart.itemsPrice}
                  </li>
                  <li>
                    <span>Shipping:</span> $ {cart.shippingPrice}
                  </li>
                  <li>
                    <span>Tax:</span> $ {cart.taxPrice}
                  </li>
                  <li>
                    <span>Total:</span> $ {cart.totalPrice}
                  </li>
                </ul>

                {error && <span className="text-red-500">{error.message}</span>}

                <div>
                  <h2 className="text-2xl font-semibold">Shipping</h2>
                  <p>
                    Address: {cart.shippingAddress.address},{" "}
                    {cart.shippingAddress.city}{" "}
                    {cart.shippingAddress.postalCode},{" "}
                    {cart.shippingAddress.country}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold">Payment Method</h2>
                  <span>Method: {cart.paymentMethod}</span>
                </div>
              </div>
              <button
                onClick={submitOrderHandler}
                className="w-[50%] bg-green-500 rounded-full p-1 mt-3 text-white opacity-80 hover:opacity-100 uppercase "
              >
                Submit Order
              </button>

              {isLoading && <Loader />}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PlaceOrder;
