// OpenOrders.js
import React, { useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import BuySellPanel from "./BuySellPanel";
import { useWebSocketTrade } from "./WebSocketTrade";
import BuySellSub from "./BuySellSub";

const OpenOrders = ({ trades, maxTrades }) => {
  
  const openTrades = trades.filter(
    (trade) => trade.trade_status === "incomplete"
  );
  const { prices } = useWebSocketTrade();
  const [expandedTradeIndex, setExpandedTradeIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);
  console.log(selectedTrade,"selected trade")
  const [selectedToken, setSelectedToken] = useState(null);
  console.log(selectedToken,"setSelectedToken")


  const toggleExpand = (index) => {
    setExpandedTradeIndex(index === expandedTradeIndex ? null : index);
  };

  const displayedTrades = maxTrades ? trades.slice(0, maxTrades) : trades;

  const handleOpenModal = (trade) => {
    setSelectedTrade(trade);
    
    setSelectedToken(trade.invested_coin);

    

    setModalOpen(true); 
  };

  
  const calculatePL = (trade) => {
    const tradePrice = parseFloat(trade.avg_price); 
    const quantity = parseFloat(trade.quantity);
    const currentPrice = prices[trade.token_id] || 0; // Get current price for the trade's token_id
    if (trade.trade_type === "Buy") {
      return ((currentPrice - tradePrice) * quantity).toFixed(2);
    } else if (trade.trade_type === "Sell") {
      return ((tradePrice - currentPrice) * quantity).toFixed(2);
    }
    return "0.00";
  };

  return (
    <>
    
      <div className="max-w-5xl mx-auto mt-8 p-4">

        {openTrades.length > 0 && displayedTrades.length > 0 ? (
          displayedTrades.map((trade, index) => (
            <div
              key={index}
              className="bg-white rounded-lg mb-4 shadow transition-all duration-300"
            >
              
              <div
                onClick={() => toggleExpand(index)}
                className="flex items-center justify-between p-4 cursor-pointer"
              >
                <div className="flex-1">
                  <div className="text-lg font-semibold text-gray-700">
                    {trade.display_name || "N/A"}
                  </div>

                  <div className="text-left">
                    <div
                      className={`text-lg font-semibold flex items-center ${
                        calculatePL(trade) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {Math.abs(calculatePL(trade))}
                      <span className="ml-1">
                        {calculatePL(trade) >= 0 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {calculatePL(trade) >= 0 ? "Profit" : "Loss"}
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 justify-between items-center space-x-8">
                  <div className="text-center">

                  <div className="text-sm font-medium text-gray-500">Live Price</div>
  <div className="text-lg font-semibold text-gray-800">
    {prices[trade.token_id] ? prices[trade.token_id].toFixed(2) : "N/A"}
  </div>


                    <div className="text-sm font-medium text-gray-500">
                      Trade Type
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      {trade.trade_type}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-500">
                      Avg. Price
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      {trade.avg_price}
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
                } transition-max-height duration-300`}
              >
                <div className="p-4 bg-gray-100">
                  <p className="text-gray-700">
                    <strong>Details:</strong>{" "}
                    {trade.details || "No details available."}
                  </p>
                  <p className="text-gray-500 mt-2">
                    <strong>Created On:</strong> {trade.created_at}
                  </p>
                  <button
                    onClick={() => handleOpenModal(trade)}
                    className={`mt-4 px-4 py-2 rounded-md ${
                      trade.trade_type === "Buy"
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {trade.trade_type === "Buy" ? "Sell" : "Buy"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No Open Positions available.
          </p>
        )}

        {modalOpen && selectedTrade && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <BuySellSub
              trades={trades}
              selectedData={selectedTrade}
                onClose={() => setModalOpen(false)}
                initialIsBuy={selectedTrade.trade_type === "Buy"} // Use selectedTrade to determine initialIsBuy
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OpenOrders;
