import React, { useEffect, useState } from "react";
import axios from "axios";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

const ClosedOrders = ({ maxTrades }) => {
  const [expandedTradeIndex, setExpandedTradeIndex] = useState(null);
  const toggleExpand = (index) => {
    setExpandedTradeIndex(index === expandedTradeIndex ? null : index);
  };

  const [trades, setTrades] = useState([]);

  const authDataString = localStorage.getItem("authData");
  const authData = authDataString ? JSON.parse(authDataString) : null;
  const accessToken = authData?.access;

  useEffect(() => {
    const fetchClosedOrders = async () => {
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
            (trade) => trade.trade_status === "complete"
          );
          setTrades(completedTrades);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching open orders data:", error);
      }
    };

    fetchClosedOrders();
  }, [accessToken]);

  const displayedTrades = maxTrades ? trades.slice(0, maxTrades) : trades;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      {displayedTrades.length > 0 ? (
        displayedTrades.map((trade, index) => (
          <div
            key={index}
            className="bg-white rounded-lg mb-4 shadow transition-all duration-300"
          >
            <div
              onClick={() => toggleExpand(index)}
              className="flex items-center justify-between p-4 cursor-pointer"
            >
              <div className="flex-1 text-lg font-semibold text-gray-700">
                {trade.display_name || "N/A"}
              </div>
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
                      trade.pl && trade.pl.startsWith("-")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {trade.pl || "N/A"}
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
              <EllipsisVerticalIcon className="h-6 w-6 text-gray-500" />
            </div>
            <div
              className={`overflow-hidden ${
                expandedTradeIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="p-4 bg-gray-100">
                <p className="text-gray-700">
                  <strong>Details:</strong> {trade.details || "No details available."}
                </p>
                <p className="text-gray-500 mt-2">
                  <strong>Created On:</strong> {trade.created_at}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No Closed Positions available.</p>
      )}
    </div>
  );
};

export default ClosedOrders;
