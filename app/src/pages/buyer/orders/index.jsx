import { useStateProvider } from "../../../context/StateContext";
import { GET_BUYER_ORDERS_ROUTE } from "../../../utils/constants";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ userInfo }] = useStateProvider();
  useEffect(() => {
    const getOrders = async () => {
      try {
        const {
          data: { orders },
        } = await axios.get(GET_BUYER_ORDERS_ROUTE, { withCredentials: true });
        setOrders(orders);
      } catch (err) {
        console.error(err);
      }
    };
    if (userInfo) getOrders();
  }, [userInfo]);
  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h3 className="m-5 text-2xl font-semibold">All your Orders</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-900">
          <thead className="text-xs text-black uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Delivery Time
              </th>
              <th scope="col" className="px-6 py-3">
                Order Date
              </th>
              <th scope="col" className="px-6 py-3">
                Send Message
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr className="bg-white hover:bg-gray-100" key={order.id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    {order.id}
                  </th>
                  <td className="px-6 py-4 text-gray-900">{order.gig.title}</td>
                  <td className="px-6 py-4 text-gray-900">
                    {order.gig.category}
                  </td>
                  <td className="px-6 py-4 text-gray-900">{order.price}</td>
                  <td className="px-6 py-4 text-gray-900">
                    {order.gig.deliveryTime}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {order.createdAt.split("T")[0]}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    <Link
                      href={`/buyer/orders/messages/${order.id}`}
                      className="font-medium text-purple-600 hover:underline"
                    >
                      Send
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
