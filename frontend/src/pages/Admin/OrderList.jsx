import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mx-[8rem]">
          <table className="w-full  text-white">
            <thead>
              <tr>
                <td className="py-2">ITEMS</td>
                <td className="py-2">ID</td>
                <td className="py-2">USER</td>
                <td className="py-2">DATE</td>
                <td className="py-2">TOTAL</td>
                <td className="py-2">PAID</td>
                <td className="py-2">DELIVERED</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="py-2">
                    <img
                      src={order.orderItems[0].image}
                      alt={order._id}
                      className="w-[6rem] h-[5rem]"
                    />
                  </td>

                  <td className="py-2">{order._id}</td>

                  <td className="py-2">
                    {order.user ? order.user.username : "N/A"}
                  </td>

                  <td className="py-2">
                    {order.createdAt ? order.createdAt.substr(0, 10) : "N/A"}
                  </td>

                  <td className="py-2">$ {order.totalPrice}</td>

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

                  <td className="py-2">
                    {order.isDelivered ? (
                      <p className="p-1 rounded-full w-[6rem] bg-green-500">
                        Delivered
                      </p>
                    ) : (
                      <p className="p-1 rounded-full w-[6rem] bg-red-500 text-center">
                        Pending
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <AdminMenu />
        </div>
      )}
    </>
  );
};

export default OrderList;
