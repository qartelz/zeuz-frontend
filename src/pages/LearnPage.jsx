import React, { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import CoinSvg from "../assets/svg/CoinSvg";
import SearchBar from "../components/SearchBar";
import TradingViewWidget from "../components/TradingViewWidget";
import StockInfo from "../components/StockInfo";
import BuySellPanel from "../components/BuySellPanel";
import BeetleBalance from "../components/BeetleBalance";

const LearnPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const stocks = [
    { name: "Apple Inc.", price: 150 },
    { name: "Apple Services", price: 120 },
    { name: "Apple Devices", price: 180 },
    { name: "Microsoft Corp.", price: 250 },
  ];

  const handleSearch = (query) => {
    const filteredResults = stocks.filter((stock) =>
      stock.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  };

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <div className="p-4 text-gray-800 ">
      <Navbar />

      <div className="flex items-center gap-2 p-10">
        <span>Practice</span>
        <ChevronRightIcon className="h-4 w-4" />
        <span className="font-bold text-[#026E78]">Learn Equity</span>
      </div>

      <div className="flex flex-col items-center mt-12">


       <BeetleBalance/>

        <SearchBar
          searchQuery={searchQuery}
          handleChange={handleChange}
          handleSearch={handleSearch}
        />

        <p className="mt-4 text-center text-sm text-gray-500">
          or change{" "}
          <a className="text-black" href="/practice">
            <strong>
              <u>Trade Type</u>
            </strong>
          </a>
        </p>

        {searchQuery && results.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-xl font-semibold mb-4">
              {results.length} results found for "{searchQuery}"
            </p>
            <div className="grid grid-cols-2 gap-4">
              {results.map((stock, index) => (
                <div key={index} className="p-4 bg-white shadow rounded-lg">
                  <div className="text-lg font-bold">{stock.name}</div>
                  <div className="text-gray-600">Price: ${stock.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchQuery && results.length === 0 && (
          <div className="mt-6 text-center text-gray-600">
            No results found for "{searchQuery}"
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-6 p-6">
  <div className="space-y-6">
    <StockInfo />
    <TradingViewWidget />
  </div>

  <div>
    <BuySellPanel />
  </div>
</div>

    </div>
  );
};

export default LearnPage;
