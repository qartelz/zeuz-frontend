import React, { useState } from "react";
import {
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import BeetleBalance from "./BeetleBalance";

const BuySellPanel = () => {
  const [selectedStock, setSelectedStock] = useState("Stock 1");
  const [isBuy, setIsBuy] = useState(true);
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="p-4 bg-transparent rounded-md space-y-4">
      <div className="flex items-center space-x-4 whitespace-nowrap">
        <BeetleBalance className="" />
      </div>

      {/* Stock Dropdown */}
      <div className="flex bg-white items-center justify-between text-[#7D7D7D] border shadow-sm p-2 rounded-md">
        <span>{selectedStock}</span>
        <ChevronDownIcon
          className="w-4 h-4 cursor-pointer"
          onClick={() => {
        
          }}
        />
      </div>

      <div className="flex items-center justify-between space-x-2">
  <span className="text-[#7D7D7D] text-xl font-bold">I want to:</span>
  <div className="flex space-x-2">
    <button
      className={`px-8 py-2 rounded-md ${
        isBuy
          ? "bg-[#E8FCF1] text-green-500 border font-bold"
          : "bg-transparent text-[#7D7D7D]"
      }`}
      onClick={() => setIsBuy(true)}
    >
      Buy
    </button>
    <button
      className={`px-8 py-2 rounded-md ${
        !isBuy
          ? "bg-[#E8FCF1] text-red-500 border font-bold"
          : "bg-transparent text-[#7D7D7D]"
      }`}
      onClick={() => setIsBuy(false)}
    >
      Sell
    </button>
  </div>
</div>


      <div className="space-y-2">
        {/* Quantity */}
        <div className="flex items-center justify-between bg-white text-[#7D7D7D] border shadow-sm p-2 rounded-md">
          <span>Quantity</span>
          <div className="flex items-center space-x-2">
            <MinusIcon
              className="w-4 h-4 cursor-pointer"
              onClick={() => setQuantity((q) => Math.max(0, q - 1))}
            />
            <span>{quantity}</span>
            <PlusIcon
              className="w-4 h-4 cursor-pointer"
              onClick={() => setQuantity((q) => q + 1)}
            />
          </div>
        </div>

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          className="w-full p-2 text-[#7D7D7D] border bg-white rounded-md"
        />

        {/* Order Type Dropdown */}
        <div className="flex items-center justify-between bg-white text-[#7D7D7D] border p-2 rounded-md">
          <span>Order Type</span>
          <ChevronDownIcon
            className="w-4 h-4 cursor-pointer"
            onClick={() => {
              /* toggle dropdown */
            }}
          />
        </div>
      </div>

      {/* Buy/Sell and Cancel Buttons */}
      <div className="flex px-10 text-white text-bold space-x-2">
        <button
          className={`w-full px-2 py-2 rounded-md ${
            isBuy ? "bg-green-800" : "bg-[#D83232]"
          } text-white`}
        >
          {isBuy ? "Buy" : "Sell"}
        </button>

        <button className="w-full bg-gray-500 py-2 rounded-md">Cancel</button>
      </div>
    </div>
  );
};

export default BuySellPanel;
