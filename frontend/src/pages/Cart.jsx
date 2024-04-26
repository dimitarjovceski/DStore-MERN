import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    navigate("/login?redirect=/shipping")
  }

  return (
    <>
      <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div className="text-white text-2xl">
            Your cart is empty. <Link to="/shop">Go to shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%]">
              <h1 className="text-2xl font-semibold mb-10 text-white">
                Shopping Cart
              </h1>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center mb-[1rem] pb-2 w-[80%]"
                >
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 ml-4">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-white font-semibold"
                    >
                      {item.name}
                    </Link>

                    <div className="mt-2 text-white ">{item.brand}</div>
                    <div className="mt-2 text-white font-bold">
                      $ {item.price}
                    </div>
                  </div>

                  <div className="w-24">
                    <select
                      className="w-full p-1 border rounded text-white bg-black"
                      value={item.quantity}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button onClick={() => removeFromCartHandler(item._id)} className="text-red-500 mr-[5rem]">
                      <FaTrash className="ml-[1rem]" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-8 w-[40rem] text-white">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Items (
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  </h2>

                  <div className="text-2xl font-bold">
                    Total price: ${" "}
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </div>
                </div>
                <button
                    onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className="bg-green-600 mt-4 text-white py-2 px-4 md:w-full rounded-md uppercase opacity-80 hover:opacity-100"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
