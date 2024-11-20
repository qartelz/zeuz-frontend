import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import ClosedOrders from "../components/ClosedOrders";
import OpenOrders from "../components/OpenOrders";
import axios from "axios";

const TradesPage = () => {

  const [trades, setTrades] = useState([]);

  const authDataString = localStorage.getItem("authData");
  const authData = authDataString ? JSON.parse(authDataString) : null;
  const accessToken = authData?.access;


  


  useEffect(() => {
    const fetchOpenOrders = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/trades/trades/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

         



        if (response.data && Array.isArray(response.data)) {
          
          const completedTrades = response.data.filter(
            (trade) => trade.trade_status === "incomplete"
          );
          setTrades(completedTrades);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching open orders data:", error);
      }
    };

    fetchOpenOrders();
  }, [accessToken]);



  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-8 p-4 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Open Positions.
        </h1>

        <OpenOrders trades={trades}/>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Closed Positions.
          </h2>
          <ClosedOrders />
        </section>
      </div>
    </>
  );
};

export default TradesPage;
