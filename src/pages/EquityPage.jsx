import React, { useState } from "react";
import {
  ChevronRightIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import CoinSvg from "../assets/svg/CoinSvg";

const EquityPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  // Dummy data for stocks
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

  // Automatically update the search results as the user types
  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query); // Filter results immediately when typing
  };

  return (
    <div className="p-4 text-gray-800 h-screen">
      <Navbar />
      <div className="flex items-center gap-2 p-10">
        <span>Practice</span>
        <ChevronRightIcon className="h-4 w-4" />
        <span className="font-bold text-[#026E78]">Learn Equity</span>
      </div>

      {/* Center Section */}
      <div className="flex flex-col items-center mt-12">
        {/* Balance and Info */}
        <div className="flex items-center justify-between bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
          <div className="bg-gray-200 rounded-full h-20 w-20 flex items-center justify-center">
            <CoinSvg />
          </div>

          <div className="ml-4">
            <div className="text-4xl text-[#BF9900] font-extrabold">
              Beetle Balance
            </div>
            <div className="text-4xl flex items-center font-extrabold">
              1000
              <div className="flex items-end">
                <div className="text-xl font-medium mt-2 ml-2">/ 5000</div>
              </div>
              <div className="flex items-center">
                <PlusIcon className="h-6 w-6 text-blue-500 ml-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Search box */}
        <div className="flex items-center mt-8 w-full max-w-lg">
          <div className="flex items-center border border-gray-300 rounded-l-md px-2 w-full">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search asset"
              value={searchQuery}
              onChange={handleChange} // Update results on input change
              className="w-full p-2 outline-none"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
          >
            Search
          </button>
        </div>

        {/* Instruction Text */}
        <p className="mt-4 text-center text-sm text-gray-500">
          or change trade type
        </p>

        {/* Search Results */}
        {results.length > 0 && (
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
      </div>
    </div>
  );
};

export default EquityPage;
