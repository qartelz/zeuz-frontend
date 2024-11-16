import React, { useState } from "react";

const OptionChain = () => {
  const [selectedStrike, setSelectedStrike] = useState(null);

  const data = [
    { call: 50, strike: 100, put: 40 },
    { call: 60, strike: 110, put: 30 },
    { call: 70, strike: 120, put: 20 },
    { call: 80, strike: 130, put: 10 },
  ];

  const handleStrikeClick = (strike) => {
    setSelectedStrike(strike);
  };

  return (
    <div className="flex justify-center mt-10">
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Call</th>
            <th className="border border-gray-400 px-4 py-2">Strike</th>
            <th className="border border-gray-400 px-4 py-2">Put</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td
                className={`border border-gray-400 px-4 py-2 ${
                  selectedStrike === row.strike ? "bg-yellow-200" : ""
                }`}
              >
                {row.call}
              </td>
              <td
                className={`border border-gray-400 px-4 py-2 ${
                  selectedStrike === row.strike ? "bg-yellow-200" : ""
                }`}
                onClick={() => handleStrikeClick(row.strike)}
              >
                {row.strike}
              </td>
              <td
                className={`border border-gray-400 px-4 py-2 ${
                  selectedStrike === row.strike ? "bg-yellow-200" : ""
                }`}
              >
                {row.put}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OptionChain;
