import React, { useEffect, useState } from "react";
import axios from "axios";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

const OpenOrders = () => {
  const [trades, setTrades] = useState([]); // State to store trades

  const authDataString = localStorage.getItem("authData");
  const authData = authDataString ? JSON.parse(authDataString) : null;
  const accessToken = authData?.access;

  useEffect(() => {
    console.log(accessToken, "accessToken");

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
        console.log(response, "the response");

        // Update the trades state with the API response data
        if (response.data && Array.isArray(response.data)) {
          setTrades(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching open orders data:", error);
      }
    };

    fetchOpenOrders();
  }, [accessToken]); // Add accessToken as a dependency to re-fetch when it changes

  return (
    <div>
      <div className="max-w-4xl mx-auto mt-8 p-4">
        {trades.length > 0 ? (
          trades.map((trade, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white rounded-lg  mb-4"
            >
              {/* Left Side: Stock Name */}
              <div className="flex-1 text-lg font-semibold text-gray-700">
                {trade.display_name} {/* Ensure trade.name is present in the API response */}
              </div>

              {/* Right Side: Details Horizontally */}
              <div className="flex flex-1 justify-between items-center space-x-8">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500">
                    Trade Type
                  </div>
                  <div className="text-lg font-semibold text-gray-800">
                    {trade.trade_type}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500">
                    Quantity
                  </div>
                  <div className="text-lg font-semibold text-gray-800">
                    {trade.quantity}
                  </div>
                </div>

                <div className="text-center">
  <div className="text-sm font-medium text-gray-500">P/L</div>
  <div
    className={`text-lg font-semibold ${
      trade.pl && typeof trade.pl === "string" && trade.pl.startsWith("-")
        ? "text-red-500"
        : "text-green-500"
    }`}
  >
    {trade.pl !== undefined ? trade.pl : "N/A"}
  </div>
</div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500">
                    Invested
                  </div>
                  <div className="text-lg font-semibold text-gray-800">
                    {trade.invested_coin}
                  </div>
                </div>
              </div>

              {/* Icon */}
              <EllipsisVerticalIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No open orders available.</p>
        )}
        {/* Button to Navigate */}
        <div className="mt-6 text-right">
          <button
            // onClick={navigateToAllTrades}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
          >
            All Trades <span className="ml-2">»</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenOrders;
