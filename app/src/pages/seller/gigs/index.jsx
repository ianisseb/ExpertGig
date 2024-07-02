import {
  GET_USER_GIGS_ROUTE,
  DELETE_GIG_ROUTE,
} from "../../../utils/constants";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Index() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const getUserGigs = async () => {
      try {
        const {
          data: { gigs: gigsData },
        } = await axios.get(GET_USER_GIGS_ROUTE, {
          withCredentials: true,
        });
        setGigs(gigsData);
      } catch (err) {
        console.log(err);
      }
    };
    getUserGigs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(DELETE_GIG_ROUTE(id), {
        withCredentials: true,
      });
      setGigs(gigs.filter((gig) => gig.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h3 className="m-5 text-2xl  font-semibold">All your Gigs</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-900">
          <thead className="text-xs text-black uppercase bg-gray-50">
            <tr>
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
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {gigs.map(({ title, category, price, deliveryTime, id }) => {
              return (
                <tr className="bg-white hover:bg-gray-100" key={id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {title}
                  </th>
                  <td className="px-6 py-4">{category}</td>
                  <td className="px-6 py-4">{price}</td>
                  <td className="px-6 py-4">{deliveryTime}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/seller/gigs/${id}`}
                      className="font-medium text-purple-600 hover:underline"
                    >
                      Edit
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

export default Index;
