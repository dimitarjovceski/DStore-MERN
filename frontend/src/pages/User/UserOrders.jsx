import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import {
  orderApiSice,
  useGetMyOrdersQuery,
} from "../../redux/api/orderApiSlice";

const UserOrders = () => {
  const { data: order, isLoading, error } = useGetMyOrdersQuery();
  return (
    <div className="container mx-auto ml-[10rem]">
      <h2 className="text-2xl text-white font-semibold">My Orders</h2>

      {isLoading ? (
        <Loader />
      ) : (
        <table className="w-full mt-5 text-white">
          <thead>
            <tr>
              <td className="py-2">Images</td>
              <td className="py-2">ID</td>
              <td className="py-2">DATE</td>
              <td className="py-2">TOTAL</td>
              <td className="py-2">PAID</td>
              <td className="py-2">DELIVERED</td>
            </tr>
          </thead>

          <tbody>
            {order.map((order) => (
              <tr key={order._id}>
                <img
                  src={order.orderItems[0].image}
                  alt={order.user}
                  className="w-[6rem]"
                />

                <td className="py-2">{order._id}</td>
                <td className="py-2">{order.createdAt.substr(0, 10)}</td>
                <td className="py-2">${order.totalPrice}</td>
                <td className="py-2">
                  {order.isPaid ? (
                    <p className="p-1 rounded-full w-[6rem] bg-green-500">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 rounded-full w-[6rem] bg-red-500 text-center">
                      Pending
                    </p>
                  )}
                </td>

                <td className="py-2 px-2">
                  {order.isDelivered ? (
                    <p className="p-1 rounded-full w-[6rem] bg-green-500">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 rounded-full w-[6rem] bg-red-500 text-center">
                      Pending
                    </p>
                  )}
                </td>

                {/* <td className="px-2 py-2">
                    <Link to={`/order/${order._id}`}>
                        <button className="bg-black text-white px-4 py-2 rounded-full">View Details</button> 
                    </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrders;
