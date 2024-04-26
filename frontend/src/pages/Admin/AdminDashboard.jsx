import Loader from "../../components/Loader"
import AdminMenu from "../Admin/AdminMenu"
import {useGetTotalSalesQuery, useGetOrdersQuery, useGetTotalOrdersQuery} from "../../redux/api/orderApiSlice"
import {useGetUsersQuery} from "../../redux/api/userApiSlice"
import OrderList from "./OrderList"

const AdminDashboard = () => {

    const {data: sales, isLoading: salesLoading } = useGetTotalSalesQuery();
    const {data: users, isLoading: usersLoading} = useGetUsersQuery();
    const {data: orders, isLoading: ordersLoading} = useGetTotalOrdersQuery();
    console.log(orders);
  return (
    <>
        <AdminMenu />

        <section className="xl:ml-[4rem] md:ml-[0rem]">
        <section className="w-[80%] flex flex-wrap justify-around">
            <div className="rounded-lg bg-black p-5 w-[20rem]">
                <div className="font-bold rounded-full mx-auto w-[3rem] bg-white text-center p-3">
                    $
                </div>

                <p className="text-white mt-5">Total Sales:</p>
                <h2 className="font-bold text-xl text-white">
                    $ {salesLoading ? <Loader /> : sales.totalSales.toFixed(2)}
                </h2>
            </div>

            <div className="rounded-lg bg-black p-5 w-[20rem]">
                <div className="font-bold rounded-full w-[5rem] mx-auto bg-white text-center p-3">
                    Orders
                </div>

                <p className="text-white mt-5">Total Orders:</p>
                <h2 className="font-bold text-xl text-white">
                     {ordersLoading ? <Loader /> : orders}
                </h2>
            </div>

            <div className="rounded-lg bg-black p-5 w-[20rem]">
                <div className="font-bold rounded-full w-[5rem] bg-white mx-auto text-center p-3">
                    Users
                </div>

                <p className="text-white mt-5">Total Users:</p>
                <h2 className="font-bold text-xl text-white">
                     {usersLoading ? <Loader /> : users.length}
                </h2>
            </div>
        </section>

        <div className="mt-[6rem]">
            <h1 className="text-2xl text-white ml-[8rem] mb-8">All Orders:</h1>
            <OrderList />
        </div>
        </section>
    </>
  )
}

export default AdminDashboard