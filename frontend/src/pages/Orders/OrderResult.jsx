import { Link } from "react-router-dom";
const OrderResult = () => {
  return (
    <div className="justify-center text-center ">
      <h1 className="text-4xl mt-[20rem] text-green-500 mb-8">
        Thank you! Your order will be delivered on your address soon as
        possible!
      </h1>
      <Link className="bg-black text-white px-6 py-4 rounded-md opacity-80 hover:opacity-100 " to="/shop">Back to Shop</Link>
    </div>
  );
};

export default OrderResult;
