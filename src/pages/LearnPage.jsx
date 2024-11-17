import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import TradingViewWidget from "../components/TradingViewWidget";
import StockInfo from "../components/StockInfo";
import BuySellPanel from "../components/BuySellPanel";
import BeetleBalance from "../components/BeetleBalance";
import OptionChain from "../components/OptionChain";

const LearnPage = () => {

  const optionData = [
    {
      strike: 1500,
      call: {
        OI: 1200,
        OIChange: 50,
        volume: 500,
        LTP: 10.5,
        bgColor: 'bg-green-200', // dynamic background color
      },
      put: {
        OI: 1100,
        OIChange: 30,
        volume: 450,
        LTP: 8.4,
        bgColor: 'bg-red-200', // dynamic background color
      },
    },
    {
      strike: 1600,
      call: {
        OI: 1300,
        OIChange: -20,
        volume: 400,
        LTP: 12.3,
        bgColor: 'bg-green-300',
      },
      put: {
        OI: 1150,
        OIChange: 10,
        volume: 460,
        LTP: 7.9,
        bgColor: 'bg-red-300',
      },
    },
    // Add more rows as needed
  ];


  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  const [results, setResults] = useState([]);
  console.log(results)
  const [selectedData, setSelectedData] = useState(null);

  const { heading } = location.state || {};

  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Function to determine the API endpoint based on the heading
    const getApiEndpoint = () => {
      if (heading === "Equity Trading") {
        return "http://127.0.0.1:8000/instrument/search/?exchange=NSE";
      } else if (heading === "Futures Trading") {
        return "http://127.0.0.1:8000/instrument/search/?exchange=NFO&segment=FUT";
      }
      // Add more conditions here if needed for other headings
      return null;
    };

    const fetchStocks = async () => {
      try {
        const endpoint = getApiEndpoint();
        if (!endpoint) return; // Exit if no API endpoint is determined

        const response = await fetch(endpoint);
        const data = await response.json(); // assuming the backend returns a JSON array
        console.log(data)
        setStocks(data); // update the state with the fetched data
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    // Fetch data when the component mounts or when the heading changes
    fetchStocks();
  }, [heading]); // Dependency array includes heading

  // const handleSearch = (query) => {
  //   const filteredResults = stocks.filter((stock) =>
  //     stock.name.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setResults(filteredResults);
  // };
  const handleSearch = (query) => {
    const filteredResults = stocks.filter((stock) =>
      stock.display_name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  };
  

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Reset selected data if user starts a new search
    if (selectedData) setSelectedData(null);

    handleSearch(query);
  };

  const handleSelectStock = (stock) => {
    setSelectedData(stock); // Set the selected stock
    setSearchQuery(""); // Clear the search input
    setResults([]); // Clear the search results
  };

  const filteredStocks = stocks.filter((stock) =>
    stock.display_name.toLowerCase().includes(searchQuery.toLowerCase())
  
  );
  // console.log(filteredStocks)

  return (
    <div className="p-4 text-gray-800 min-h-screen">
      <Navbar />

      <div className="flex items-center gap-2 p-10">
        <span>Practice</span>
        <ChevronRightIcon className="h-4 w-4" />
        <span className="font-bold text-[#026E78]">{heading}</span>
      </div>

      <div className="flex flex-col items-center mt-12">
        {!selectedData && <BeetleBalance />}

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

        {!selectedData && (
          <>
            {searchQuery && results.length > 0 && (
              <div className="mt-6 text-center">
                <p className="text-xl font-semibold mb-4">
                  {results.length} results found for "{searchQuery}"
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {results.map((stock, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white shadow rounded-lg cursor-pointer"
                      onClick={() => handleSelectStock(stock)}
                    >
                      <div className="text-lg font-bold">{stock.display_name}</div>
                      <div className="text-gray-600">Exchange: {stock.exchange}</div>
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
          </>
        )}
      </div>

      {selectedData && !searchQuery && heading !== "Options Trading" && (
        <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-6 p-6">
          <div className="space-y-6">
            <StockInfo selectedData={selectedData} stocks={stocks} results={results} />
            <TradingViewWidget />
          </div>

          <div>
            <BuySellPanel selectedData={selectedData} />
          </div>
        </div>
      )}

      { heading === "Options Trading" && (
        <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-6 p-6">
          <div className="space-y-6">
            <OptionChain  data={optionData} heading={heading} />
          </div>
          <div>
            <BuySellPanel selectedData={selectedData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnPage;
