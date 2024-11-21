import React, { useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import BuySellPanel from "./BuySellPanel"; // Import your modal component
import { useWebSocket } from "./WebSocketComponent";

const OpenOrders = ({ trades, maxTrades }) => {

  const { lastPrice } = useWebSocket();
  console.log(lastPrice,"trade ltp")
  const [expandedTradeIndex, setExpandedTradeIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);

  const toggleExpand = (index) => {
    setExpandedTradeIndex(index === expandedTradeIndex ? null : index);
  };

  const displayedTrades = maxTrades ? trades.slice(0, maxTrades) : trades;

  const handleOpenModal = (trade) => {
    setSelectedTrade(trade); // Pass the selected trade to the modal
    setModalOpen(true); // Open the modal
  };

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
                    {/* console.log(  trade.trade_type,"trade_type") */}
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
                    className
                  >
                    {lastPrice}
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
        <p className="text-center text-gray-500">No Open Positions available.</p>
      )}
      {/* Render Modal */}
      {modalOpen && selectedTrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <BuySellPanel
              selectedData={selectedTrade}
              onClose={() => setModalOpen(false)}
              initialIsBuy={selectedTrade.trade_type === "Buy"} // Use selectedTrade to determine initialIsBuy
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenOrders;
