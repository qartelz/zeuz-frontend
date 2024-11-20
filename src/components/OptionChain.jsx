import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

const OptionChain = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [expiryDates, setExpiryDates] = useState([]);
  const [selectedExpiry, setSelectedExpiry] = useState(null);
  const [optionsData, setOptionsData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(23532.7);
  const tableRef = useRef(null);
  const websocketRef = useRef(null); // WebSocket reference

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/instrument/optionchain/',
          { params: { script_name: 'BANKNIFTY' } }
        );
        const { unique_expiry_dates, grouped_data } = response.data;

        setExpiryDates(unique_expiry_dates);
        setSelectedExpiry(unique_expiry_dates[0]); // Default to the first expiry date
        setOptionsData(grouped_data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // Fetch options data for the selected expiry
  useEffect(() => {
    const fetchOptionsForExpiry = async () => {
      if (!selectedExpiry) return;

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/instrument/optionchain/${selectedExpiry}`
        );
        setOptionsData(response.data.grouped_data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOptionsForExpiry();
  }, [selectedExpiry]);

  // WebSocket connection
  useEffect(() => {
    websocketRef.current = new WebSocket(
      'wss://orca-uatwss.enrichmoney.in/ws'
    );

    websocketRef.current.onopen = () => {
      console.log('WebSocket connection established');
      websocketRef.current.send(
        JSON.stringify({
          type: 'subscribe',
          script_name: 'BANKNIFTY',
        })
      );
    };

    websocketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('WebSocket message received:', message);

      if (message.type === 'update' && message.data) {
        // Update the options data with the new data
        setOptionsData((prevData) => {
          // Merge or replace logic here
          return prevData.map((group) => {
            if (group.expiry_date === message.data.expiry_date) {
              return {
                ...group,
                options: message.data.options,
              };
            }
            return group;
          });
        });
      }
    };

    websocketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    websocketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, []);

  // Filter data based on selected expiry date
  const getDisplayData = () => {
    if (!selectedExpiry || !optionsData.length) return [];

    const filteredData = optionsData.find(
      (group) => group.expiry_date === selectedExpiry
    )?.options;

    if (!filteredData) return [];

    return filteredData
      .map((option) => ({
        strike: option.strike_price,
        call: option.call || {
          vega: '--',
          theta: '--',
          gamma: '--',
          delta: '--',
          impVol: '--',
          volume: '--',
          oi: '--',
          price: '--',
        },
        put: option.put || {
          vega: '--',
          theta: '--',
          gamma: '--',
          delta: '--',
          impVol: '--',
          volume: '--',
          oi: '--',
          price: '--',
        },
      }))
      .sort((a, b) => a.strike - b.strike); // Sort by strike price in ascending order
  };

  // Highlight row colors
  const getRowBackground = (strike) => {
    if (strike < currentPrice) {
      return {
        call: 'bg-red-100',
        put: 'bg-white',
      };
    } else if (strike > currentPrice) {
      return {
        call: 'bg-white',
        put: 'bg-red-100',
      };
    }
    return {
      call: 'bg-gray-100',
      put: 'bg-gray-100',
    };
  };

  const displayData = getDisplayData();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-lg">
    <div className="overflow-y-auto max-h-[500px]">
  <table ref={tableRef} className="w-full border-collapse text-sm">
    <thead className="sticky top-0 bg-white z-10">
      <tr className="border-b">
        <th colSpan={8} className="text-center bg-blue-50 p-2">CALLS</th>
        <th className="text-center bg-gray-50 p-2">Strike</th>
        <th colSpan={8} className="text-center bg-blue-50 p-2">PUTS</th>
      </tr>
      <tr className="text-xs border-b">
        <th className="p-2">Vega</th>
        <th className="p-2">Theta</th>
        <th className="p-2">Gamma</th>
        <th className="p-2">Delta</th>
        <th className="p-2">Imp Vol</th>
        <th className="p-2">Volume</th>
        <th className="p-2">OI</th>
        <th className="p-2">Price</th>
        <th className="p-2 bg-gray-50">Strike</th>
        <th className="p-2">Price</th>
        <th className="p-2">OI</th>
        <th className="p-2">Volume</th>
        <th className="p-2">Imp Vol</th>
        <th className="p-2">Delta</th>
        <th className="p-2">Gamma</th>
        <th className="p-2">Theta</th>
        <th className="p-2">Vega</th>
      </tr>
    </thead>
    <tbody>
      {displayData.map((row, index) => {
        const bgColors = getRowBackground(row.strike);
        return (
          <tr key={`${row.strike}-${index}`} className="border-b text-right hover:bg-gray-50">
            <td className={`p-2 ${bgColors.call}`}>{row.call.vega}</td>
            <td className={`p-2 ${bgColors.call}`}>{row.call.theta}</td>
            <td className={`p-2 ${bgColors.call}`}>{row.call.gamma}</td>
            <td className={`p-2 ${bgColors.call}`}>{row.call.delta}</td>
            <td className={`p-2 ${bgColors.call}`}>{row.call.impVol}%</td>
            <td className={`p-2 ${bgColors.call}`}>{row.call.volume}</td>
            <td className={`p-2 ${bgColors.call}`}>{row.call.oi}</td>
            <td className={`p-2 ${bgColors.call}`}>{row.call.strike_price}</td>
            <td className="p-2 text-center font-medium bg-gray-50">{row.strike.toFixed(2)}</td>
            <td className={`p-2 ${bgColors.put}`}>{row.put.strike_price}</td>
            <td className={`p-2 ${bgColors.put}`}>{row.put.oi}</td>
            <td className={`p-2 ${bgColors.put}`}>{row.put.volume}</td>
            <td className={`p-2 ${bgColors.put}`}>{row.put.impVol}%</td>
            <td className={`p-2 ${bgColors.put}`}>{row.put.delta}</td>
            <td className={`p-2 ${bgColors.put}`}>{row.put.gamma}</td>
            <td className={`p-2 ${bgColors.put}`}>{row.put.theta}</td>
            <td className={`p-2 ${bgColors.put}`}>{row.put.vega}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default OptionChain;
