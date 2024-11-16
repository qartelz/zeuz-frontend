import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const StockInfo = ({ selectedData, stocks,result }) => {
  const [selectedStock, setSelectedStock] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("All Markets");
  const [showStockDropdown, setShowStockDropdown] = useState(false);
  const [showMarketDropdown, setShowMarketDropdown] = useState(false);
  
  const data = [
    { value: "+1.25%", label: "24h Change" },
    { value: "+1.25%", label: "24h High" },
    { value: "+1.25%", label: "24h Low" },
    { value: "1242552", label: "Market Volume" },
  ];
  const markets = ["All Markets", "Market A", "Market B"];

  useEffect(() => {
    if (selectedData) {
      setSelectedStock(selectedData.name); // Update selected stock
    }
  }, [selectedData]);

  const stockDropdownRef = useRef(null);
  const marketDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        stockDropdownRef.current &&
        !stockDropdownRef.current.contains(event.target) &&
        marketDropdownRef.current &&
        !marketDropdownRef.current.contains(event.target)
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
      <div className="relative" ref={stockDropdownRef}>
        <div
          className="flex items-center space-x-2 cursor-pointer whitespace-nowrap"
          onClick={() => setShowStockDropdown(!showStockDropdown)}
        >
          <span className=" font-bold">{selectedData.display_name}</span>
          {/* <ChevronDownIcon className="w-4 h-4" /> */}
        </div>

        {/* {showStockDropdown && (
          <div className="absolute  mt-2 z-10 w-40 bg-white rounded-md shadow-lg">
            {stocks.map((stock) => (
              <div
                key={stock}
                onClick={() => {
                  setSelectedStock(stock.name);
                  setShowStockDropdown(false);
                }}
                className="px-4 py-2  hover:bg-gray-200 cursor-pointer"
              >
                {stock.name}
              </div>
            ))}
          </div>
        )} */}
        

      </div>

      {/* <div className="relative flex-shrink-0 " ref={marketDropdownRef}>
        <div
          className="flex items-center space-x-2  cursor-pointer whitespace-nowrap"
          onClick={() => setShowMarketDropdown(!showMarketDropdown)}
        >
          <span>{selectedMarket}</span>
          <ChevronDownIcon className="w-4 h-4" />
        </div>
        {showMarketDropdown && (
          <div className="absolute z-10  mt-2 w-40 bg-white rounded-md shadow-lg">
            {markets.map((market) => (
              <div
                key={market}
                onClick={() => {
                  setSelectedMarket(market);
                  setShowMarketDropdown(false);
                }}
                className="px-4 py-2  hover:bg-gray-200 cursor-pointer"
              >
                {market}
              </div>
            ))}
          </div>
        )}
      </div> */}
      
      <div className="h-10 w-px bg-gray-500 mx-4 hidden md:block" />

      <div className="flex flex-wrap items-center space-x-4 space-y-2">
        <div className="text-left whitespace-nowrap">
          <p className="text-lg font-bold">1234.56</p>
          <p className="text-sm text-gray-400">Last Traded Price</p>
        </div>
      </div>

      <div className="h-10 w-px bg-gray-500 mx-4 hidden md:block" />
      
      <div className="flex space-x-9">
  {data.map((item, index) => (
    <div key={index} className="text-center whitespace-nowrap">
      <p className="text-lg font-semibold">{item.value}</p>
      <p className="text-sm text-gray-400">{item.label}</p>
    </div>
  ))}
</div>
    </div>
  );
};

export default StockInfo;
