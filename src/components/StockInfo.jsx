import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const StockInfo = () => {
  const [selectedStock, setSelectedStock] = useState("Stock 1");
  const [selectedMarket, setSelectedMarket] = useState("All Markets");
  const [showStockDropdown, setShowStockDropdown] = useState(false);
  const [showMarketDropdown, setShowMarketDropdown] = useState(false);

  const stocks = ["Stock 1", "Stock 2", "Stock 3"];
  const markets = ["All Markets", "Market A", "Market B"];

  // Refs for the dropdowns
  const stockDropdownRef = useRef(null);
  const marketDropdownRef = useRef(null);

  // Close the dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        stockDropdownRef.current && !stockDropdownRef.current.contains(event.target) &&
        marketDropdownRef.current && !marketDropdownRef.current.contains(event.target)
      ) {
        setShowStockDropdown(false);
        setShowMarketDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 bg-white border rounded-md flex justify-between items-center space-x-4">
      {/* Stock Dropdown */}
      <div className="relative" ref={stockDropdownRef}>
        <div
          className="flex items-center space-x-2 cursor-pointer whitespace-nowrap"
          onClick={() => setShowStockDropdown(!showStockDropdown)}
        >
          <svg className="w-6 h-6" aria-hidden="true" /> {/* Stock SVG */}
          <span>{selectedStock}</span>
          <ChevronDownIcon className="w-4 h-4" />
        </div>
        {showStockDropdown && (
          <div className="absolute mt-2 w-40 bg-white rounded-md shadow-lg">
            {stocks.map((stock) => (
              <div
                key={stock}
                onClick={() => {
                  setSelectedStock(stock);
                  setShowStockDropdown(false);
                }}
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
              >
                {stock}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Market Dropdown */}
      <div className="relative flex-shrink-0" ref={marketDropdownRef}>
        <div
          className="flex items-center space-x-2 cursor-pointer whitespace-nowrap"
          onClick={() => setShowMarketDropdown(!showMarketDropdown)}
        >
          <span>{selectedMarket}</span>
          <ChevronDownIcon className="w-4 h-4" />
        </div>
        {showMarketDropdown && (
          <div className="absolute mt-2 w-40 bg-white rounded-md shadow-lg">
            {markets.map((market) => (
              <div
                key={market}
                onClick={() => {
                  setSelectedMarket(market);
                  setShowMarketDropdown(false);
                }}
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
              >
                {market}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="h-10 w-px bg-gray-500 mx-4 hidden md:block" />

      <div className="flex flex-wrap items-center space-x-4 space-y-2">
        <div className="text-left whitespace-nowrap">
          <p className="text-lg font-bold">1234.56</p>
          <p className="text-sm text-gray-400">Last Traded Price</p>
        </div>
      </div>

      <div className="h-10 w-px bg-gray-500 mx-4 hidden md:block" />
      
      <div className="flex space-x-9">
        <div className="text-center whitespace-nowrap">
          <p className="text-lg font-semibold">+1.25%</p>
          <p className="text-sm text-gray-400">24h Change</p>
        </div>

        <div className="text-center whitespace-nowrap">
          <p className="text-lg font-semibold">+1.25%</p>
          <p className="text-sm text-gray-400">24h High</p>
        </div>

        <div className="text-center whitespace-nowrap">
          <p className="text-lg font-semibold">+1.25%</p>
          <p className="text-sm text-gray-400">24h Low</p>
        </div>

        <div className="text-center whitespace-nowrap">
          <p className="text-lg font-semibold">1242552</p>
          <p className="text-sm text-gray-400">Market Volume</p>
        </div>
      </div>
    </div>
  );
};

export default StockInfo;
