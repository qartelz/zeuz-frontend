import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

const OptionChain = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  console.log(baseUrl,"the base url is")


  
  const basePrice = 23532.70;
  const [currentPrice, setCurrentPrice] = useState(basePrice);
  
  // Generate the fixed strike prices once
  const generateStrikes = () => {
    const strikes = [];
    for (let i = -5; i <= 5; i++) {
      strikes.push(Math.round(basePrice + (i * 50)));
    }
    return strikes.sort((a, b) => a - b);
  };

  const [strikeValues] = useState(generateStrikes());


  const generateOptionsData = () => {
    return strikeValues.map(strike => ({
      strike,
      call: {
        vega: (11 + Math.random()).toFixed(3),
        theta: (-8 - Math.random()).toFixed(3),
        gamma: (0.001 + Math.random() * 0.001).toFixed(4),
        delta: (0.7 - Math.random() * 0.2).toFixed(3),
        impVol: (10.5 + Math.random() * 2).toFixed(2),
        volume: Math.round(Math.random() * 20000),
        oi: Math.round(Math.random() * 30),
        price: Math.round(Math.random() * 200 + 100)
      },
      put: {
        vega: (11 + Math.random()).toFixed(3),
        theta: (-9 - Math.random()).toFixed(3),
        gamma: (0.001 + Math.random() * 0.001).toFixed(4),
        delta: (-0.3 - Math.random() * 0.2).toFixed(3),
        impVol: (11 + Math.random() * 2).toFixed(2),
        volume: Math.round(Math.random() * 20000),
        oi: Math.round(Math.random() * 30),
        price: Math.round(Math.random() * 150 + 50)
      }
    }));
  };

  const [optionsData, setOptionsData] = useState(generateOptionsData());

  const generateRandomPrice = (basePrice) => {
    // Generate a random change between -4 and +4
    const randomChange = Math.floor(Math.random() * 9) - 4;
    return Number((basePrice + randomChange).toFixed(2));
  };

  // Update current price and options data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prevPrice => generateRandomPrice(prevPrice));
      setOptionsData(generateOptionsData());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const tableRef = useRef(null);

  // Get the data with current price row inserted
  const getDisplayData = () => {
    const data = [...optionsData];
    
    // Create current price row
    const currentPriceRow = {
      strike: currentPrice,
      call: {
        vega: '--',
        theta: '--',
        gamma: '--',
        delta: '--',
        impVol: '--',
        volume: '--',
        oi: '--',
        price: '--'
      },
      put: {
        vega: '--',
        theta: '--',
        gamma: '--',
        delta: '--',
        impVol: '--',
        volume: '--',
        oi: '--',
        price: '--'
      }
    };

    // Find where to insert the currentPrice row
    const insertIndex = data.findIndex(row => row.strike > currentPrice);
    if (insertIndex > -1) {
      data.splice(insertIndex, 0, currentPriceRow);
    }

    return data;
  };

  const getRowBackground = (strike) => {
    if (strike < currentPrice) {
      return {
        call: 'bg-red-100',
        put: 'bg-white'
      };
    } else if (strike > currentPrice) {
      return {
        call: 'bg-white',
        put: 'bg-red-100'
      };
    }
    return {
      call: 'bg-gray-100',
      put: 'bg-gray-100'
    };
  };

  const displayData = getDisplayData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/instrument/optionchain/', {
          params: { script_name: 'BANKNIFTY' }, // Pass query parameters here.
        });
        setData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [baseUrl]);
  


  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Options Chain</h2>
        <span className="font-medium">Current Price: ₹{currentPrice}</span>
      </div>
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
                  {row.strike === currentPrice ? (
                    <td colSpan={17} className="p-2 bg-white text-center font-bold current-price">₹{row.strike.toFixed(2)}</td>
                  ) : (
                    <>
                      <td className={`p-2 ${bgColors.call}`}>{row.call.vega}</td>
                      <td className={`p-2 ${bgColors.call}`}>{row.call.theta}</td>
                      <td className={`p-2 ${bgColors.call}`}>{row.call.gamma}</td>
                      <td className={`p-2 ${bgColors.call}`}>{row.call.delta}</td>
                      <td className={`p-2 ${bgColors.call}`}>{row.call.impVol}%</td>
                      <td className={`p-2 ${bgColors.call}`}>{row.call.volume.toLocaleString()}</td>
                      <td className={`p-2 ${bgColors.call}`}>{row.call.oi}</td>
                      <td className={`p-2 ${bgColors.call}`}>{row.call.price.toFixed(2)}</td>
                      <td className="p-2 text-center font-medium bg-gray-50">{row.strike.toFixed(2)}</td>
                      <td className={`p-2 ${bgColors.put}`}>{row.put.price.toFixed(2)}</td>
                      <td className={`p-2 ${bgColors.put}`}>{row.put.oi}</td>
                      <td className={`p-2 ${bgColors.put}`}>{row.put.volume.toLocaleString()}</td>
                      <td className={`p-2 ${bgColors.put}`}>{row.put.impVol}%</td>
                      <td className={`p-2 ${bgColors.put}`}>{row.put.delta}</td>
                      <td className={`p-2 ${bgColors.put}`}>{row.put.gamma}</td>
                      <td className={`p-2 ${bgColors.put}`}>{row.put.theta}</td>
                      <td className={`p-2 ${bgColors.put}`}>{row.put.vega}</td>
                    </>
                  )}
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