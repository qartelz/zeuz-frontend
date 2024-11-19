import React, { useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";

const TradesPage = () => {
  const [expandedTrade, setExpandedTrade] = useState({
    open: null,
    past: null,
  });

  const toggleTradeDetails = (type, index) => {
    setExpandedTrade((prev) => ({
      ...prev,
      [type]: prev[type] === index ? null : index,
    }));
  };

  const openTrades = [
    {
      name: "AAPL",
      quantity: 10,
      pl: "+$200",
      invested: "$1000",
      type: "Buy",
      avgPrice: "$100",
      lastTraded: "Nov 18, 2024",
      executionTime: "14:30:15",
      fees: "$15",
      broker: "Robinhood",
    },
    {
      name: "GOOG",
      quantity: 8,
      pl: "+$320",
      invested: "$1200",
      type: "Buy",
      avgPrice: "$120",
      lastTraded: "Nov 16, 2024",
      executionTime: "10:20:45",
      fees: "$20",
      broker: "Fidelity",
    },
    {
      name: "TSLA",
      quantity: 15,
      pl: "-$150",
      invested: "$4500",
      type: "Sell",
      avgPrice: "$300",
      lastTraded: "Nov 17, 2024",
      executionTime: "15:50:10",
      fees: "$35",
      broker: "E*TRADE",
    },
    {
      name: "META",
      quantity: 20,
      pl: "+$750",
      invested: "$5000",
      type: "Buy",
      avgPrice: "$250",
      lastTraded: "Nov 15, 2024",
      executionTime: "13:45:00",
      fees: "$25",
      broker: "Interactive Brokers",
    },
    {
      name: "NFLX",
      quantity: 12,
      pl: "-$50",
      invested: "$3000",
      type: "Sell",
      avgPrice: "$250",
      lastTraded: "Nov 18, 2024",
      executionTime: "09:20:30",
      fees: "$30",
      broker: "Robinhood",
    },
  ];

  const pastTrades = [
    {
      name: "MSFT",
      quantity: 5,
      pl: "-$50",
      invested: "$750",
      type: "Sell",
      avgPrice: "$150",
      lastTraded: "Nov 17, 2024",
      executionTime: "11:45:00",
      fees: "$10",
      broker: "E*TRADE",
    },
    {
      name: "AMZN",
      quantity: 12,
      pl: "+$500",
      invested: "$3000",
      type: "Sell",
      avgPrice: "$250",
      lastTraded: "Nov 15, 2024",
      executionTime: "16:10:30",
      fees: "$30",
      broker: "Interactive Brokers",
    },
    {
      name: "NVDA",
      quantity: 25,
      pl: "+$1000",
      invested: "$7500",
      type: "Buy",
      avgPrice: "$300",
      lastTraded: "Nov 14, 2024",
      executionTime: "12:30:25",
      fees: "$50",
      broker: "Charles Schwab",
    },
    {
      name: "BABA",
      quantity: 18,
      pl: "-$250",
      invested: "$4500",
      type: "Sell",
      avgPrice: "$250",
      lastTraded: "Nov 12, 2024",
      executionTime: "10:15:30",
      fees: "$40",
      broker: "TD Ameritrade",
    },
    {
      name: "DIS",
      quantity: 10,
      pl: "+$150",
      invested: "$2000",
      type: "Buy",
      avgPrice: "$200",
      lastTraded: "Nov 13, 2024",
      executionTime: "14:05:15",
      fees: "$25",
      broker: "Fidelity",
    },
  ];

  const renderTrades = (trades, type) =>
    trades.map((trade, index) => (
      <div
        key={index}
        className="bg-white rounded-lg shadow-sm border mb-4 overflow-hidden"
      >
        {/* Trade Summary */}
        <div
          onClick={() => toggleTradeDetails(type, index)}
          className="flex items-center justify-between p-4 cursor-pointer"
        >
          <div className="flex-1 text-lg font-semibold text-gray-700">
            {trade.name}
          </div>
          <div className="flex flex-1 justify-between items-center space-x-8">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500">
                Trade Type
              </div>
              <div className="text-lg font-semibold text-gray-800">
                {trade.type}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500">Quantity</div>
              <div className="text-lg font-semibold text-gray-800">
                {trade.quantity}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500">P/L</div>
              <div
                className={`text-lg font-semibold ${
                  trade.pl.startsWith("-")
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {trade.pl}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500">Invested</div>
              <div className="text-lg font-semibold text-gray-800">
                {trade.invested}
              </div>
            </div>
          </div>
          <EllipsisVerticalIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
        </div>

        {/* Expanded Details */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            expandedTrade[type] === index ? "max-h-60 p-4" : "max-h-0"
          } overflow-hidden bg-gray-50`}
        >
          <div className="text-gray-700 text-sm">
            <p>
              <span className="font-medium">Average Price:</span>{" "}
              {trade.avgPrice}
            </p>
            <p>
              <span className="font-medium">Last Traded:</span>{" "}
              {trade.lastTraded}
            </p>
            <p>
              <span className="font-medium">Execution Time:</span>{" "}
              {trade.executionTime}
            </p>
            <p>
              <span className="font-medium">Fees:</span> {trade.fees}
            </p>
            <p>
              <span className="font-medium">Broker:</span> {trade.broker}
            </p>
          </div>
        </div>
      </div>
    ));

  return (
    <>
    <Navbar/>
    <div className="max-w-5xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Trades Dashboard
      </h1>

      {/* Open Trades Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Open Trades
        </h2>
        {renderTrades(openTrades, "open")}
      </section>

      {/* Past Trades Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Past Trades
        </h2>
        {renderTrades(pastTrades, "past")}
      </section>

      {/* Navigation Button */}
      
    </div>
    </>
  );
};

export default TradesPage;
