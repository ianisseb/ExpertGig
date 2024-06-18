import { useStateProvider } from "../../context/StateContext";
import { GET_SELLER_DASHBOARD_DATA, HOST } from "../../utils/constants";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const [{ userInfo }] = useStateProvider();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(undefined);
  useEffect(() => {
    const getBuyerDashboardData = async () => {
      const response = await axios.get(GET_SELLER_DASHBOARD_DATA, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setDashboardData(response.data.dashboardData);
      }
      console.log({ response });
    };
    if (userInfo) {
      getBuyerDashboardData();
    }
  }, [userInfo]);

  return (
    <>
      {userInfo && (
        <div className="flex flex-col md:flex-row min-h-[80vh] my-10 mt-0 px-6 md:px-32 gap-5">
          <div className="shadow-lg p-8 flex flex-col gap-5 bg-white rounded-lg w-full md:w-1/3">
            <div className="flex gap-5 justify-center items-center">
              <div>
                {userInfo?.imageName ? (
                  <Image
                    src={userInfo.imageName}
                    alt="Profile"
                    width={140}
                    height={140}
                    className="rounded-full"
                  />
                ) : (
                  <div className="bg-purple-500 h-24 w-24 flex items-center justify-center rounded-full">
                    <span className="text-5xl text-white">
                      {userInfo.email[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#734c81] text-lg font-medium">
                  {userInfo.username}
                </span>
                <span className="font-bold text-md">{userInfo.fullName}</span>
              </div>
            </div>
            <div className="border-t py-5">
              <p>{userInfo.description}</p>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                className="shadow-lg p-6 bg-black rounded-lg cursor-pointer hover:bg-white hover:text-black hover:scale-105 transition-all duration-200"
                onClick={() => router.push("/seller/gigs")}
              >
                <h2 className="text-[#734c81] text-xl font-semibold">
                  Total Gigs
                </h2>
                <h3 className="text-[#734c81] text-3xl font-extrabold">
                  {dashboardData?.gigs}
                </h3>
              </div>
              <div
                className="shadow-lg p-6 bg-black rounded-lg cursor-pointer hover:bg-white hover:text-black hover:scale-105 transition-all duration-200"
                onClick={() => router.push("/seller/orders")}
              >
                <h2 className="text-[#734c81] text-xl font-semibold">
                  Total Orders
                </h2>
                <h3 className="text-[#734c81] text-3xl font-extrabold">
                  {dashboardData?.orders}
                </h3>
              </div>
              <div
                className="shadow-lg p-6 bg-black rounded-lg cursor-pointer hover:bg-white hover:text-black hover:scale-105 transition-all duration-200"
                onClick={() => router.push("/seller/unread-messages")}
              >
                <h2 className="text-[#734c81] text-xl font-semibold">
                  Unread Messages
                </h2>
                <h3 className="text-[#734c81] text-3xl font-extrabold">
                  {dashboardData?.unreadMessages}
                </h3>
              </div>
              <div className="shadow-lg p-6 bg-black rounded-lg cursor-pointer hover:bg-white hover:text-black hover:scale-105 transition-all duration-200">
                <h2 className="text-[#734c81] text-xl font-semibold">
                  Earnings Today
                </h2>
                <h3 className="text-[#734c81] text-3xl font-extrabold">
                  ${dashboardData?.dailyRevenue}
                </h3>
              </div>
              <div className="shadow-lg p-6 bg-black rounded-lg cursor-pointer hover:bg-white hover:text-black hover:scale-105 transition-all duration-200">
                <h2 className="text-[#734c81] text-xl font-semibold">
                  Earnings Monthly
                </h2>
                <h3 className="text-[#734c81] text-3xl font-extrabold">
                  ${dashboardData?.monthlyRevenue}
                </h3>
              </div>
              <div className="shadow-lg p-6 bg-black rounded-lg cursor-pointer hover:bg-white hover:text-black hover:scale-105 transition-all duration-200">
                <h2 className="text-[#734c81] text-xl font-semibold">
                  Earnings Yearly
                </h2>
                <h3 className="text-[#734c81] text-3xl font-extrabold">
                  ${dashboardData?.revenue}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
