import React, { useState, useEffect } from "react";

const OptionChain = ({ heading }) => {
  const [strikePrice, setStrikePrice] = useState(150); // Simulated initial strike price
  const [callOptions, setCallOptions] = useState([]);
  const [putOptions, setPutOptions] = useState([]);

  useEffect(() => {
    const fetchOptionData = () => {
      const newCallOptions = [
        { symbol: "AAPL", type: "Call", strike: 150, price: 10, volume: 1000, iv: 0.25, openInterest: 500 },
        { symbol: "AAPL", type: "Call", strike: 155, price: 12, volume: 1200, iv: 0.27, openInterest: 600 },
        { symbol: "AAPL", type: "Call", strike: 160, price: 14, volume: 1500, iv: 0.30, openInterest: 700 },
      ];

      const newPutOptions = [
        { symbol: "AAPL", type: "Put", strike: 150, price: 11, volume: 1100, iv: 0.28, openInterest: 550 },
        { symbol: "AAPL", type: "Put", strike: 155, price: 13, volume: 1300, iv: 0.26, openInterest: 650 },
        { symbol: "AAPL", type: "Put", strike: 160, price: 15, volume: 1400, iv: 0.29, openInterest: 750 },
      ];

      setCallOptions(newCallOptions);
      setPutOptions(newPutOptions);
    };

    // Simulate live data fetching every 5 seconds
    const interval = setInterval(() => {
      fetchOptionData();
      setStrikePrice((prev) => Math.round((prev + Math.random() * 2 - 1) * 100) / 100); // Random movement
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getCallOptionClass = (option) =>
    option.strike > strikePrice ? "bg-white" : "bg-yellow-100";

  const getPutOptionClass = (option) =>
    option.strike < strikePrice ? "bg-white" : "bg-yellow-100";

  return (
    <div className="space-y-8 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center">{heading}</h2>

      <div className="flex justify-center items-center">
        <span className="text-xl font-semibold text-gray-700">
          Live Strike Price:
        </span>
        <span className="ml-2 text-2xl font-bold text-blue-500">
          ${strikePrice.toFixed(2)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Call Options */}
        <div className="border bg-white shadow-md rounded-lg">
          <h3 className="text-center font-bold text-lg bg-blue-100 py-3">
            Call Options
          </h3>
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Strike</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Volume</th>
                <th className="px-4 py-2">Open Interest</th>
              </tr>
            </thead>
            <tbody>
              {callOptions.map((option, index) => (
                <tr
                  key={index}
                  className={`${getCallOptionClass(option)} hover:bg-gray-100`}
                >
                  <td className="px-4 py-2">{option.strike}</td>
                  <td className="px-4 py-2">${option.price}</td>
                  <td className="px-4 py-2">{option.volume}</td>
                  <td className="px-4 py-2">{option.openInterest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Put Options */}
        <div className="border bg-white shadow-md rounded-lg">
          <h3 className="text-center font-bold text-lg bg-red-100 py-3">
            Put Options
          </h3>
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Strike</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Volume</th>
                <th className="px-4 py-2">Open Interest</th>
              </tr>
            </thead>
            <tbody>
              {putOptions.map((option, index) => (
                <tr
                  key={index}
                  className={`${getPutOptionClass(option)} hover:bg-gray-100`}
                >
                  <td className="px-4 py-2">{option.strike}</td>
                  <td className="px-4 py-2">${option.price}</td>
                  <td className="px-4 py-2">{option.volume}</td>
                  <td className="px-4 py-2">{option.openInterest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OptionChain;
