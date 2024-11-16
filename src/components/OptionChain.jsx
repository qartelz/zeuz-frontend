import React from 'react';

const OptionsData = () => {
  const data = [
    {
      strike: "21,800.00",
      calls: {
        oi: "-",
        changeInOi: "-",
        volume: "-",
        iv: "-",
        ltp: "-",
        change: "-",
        bidQty: "1,000",
        bid: "1,582.35",
        ask: "1,874.95",
        askQty: "1,000",
      },
      puts: {
        oi: "73,481",
        changeInOi: "73,481",
        volume: "43.50",
        iv: "0.05",
        ltp: "-0.80",
        change: "0.05",
        bidQty: "3,98,175",
        bid: "21,81,911",
        ask: "-",
        askQty: "-",
      },
    },
    {
      strike: "21,850.00",
      calls: {
        oi: "-",
        changeInOi: "-",
        volume: "-",
        iv: "-",
        ltp: "-",
        change: "-",
        bidQty: "1,000",
        bid: "1,536.30",
        ask: "1,824.80",
        askQty: "1,000",
      },
      puts: {
        oi: "7,891",
        changeInOi: "7,891",
        volume: "42.29",
        iv: "0.05",
        ltp: "-0.95",
        change: "0.05",
        bidQty: "72,300",
        bid: "5,40,410",
        ask: "-",
        askQty: "-",
      },
      puts: {
        oi: "7,891",
        changeInOi: "7,891",
        volume: "42.29",
        iv: "0.05",
        ltp: "-0.95",
        change: "0.05",
        bidQty: "72,300",
        bid: "5,40,410",
        ask: "-",
        askQty: "-",
      },
      puts: {
        oi: "7,891",
        changeInOi: "7,891",
        volume: "42.29",
        iv: "0.05",
        ltp: "-0.95",
        change: "0.05",
        bidQty: "72,300",
        bid: "5,40,410",
        ask: "-",
        askQty: "-",
      },
      puts: {
        oi: "7,891",
        changeInOi: "7,891",
        volume: "42.29",
        iv: "0.05",
        ltp: "-0.95",
        change: "0.05",
        bidQty: "72,300",
        bid: "5,40,410",
        ask: "-",
        askQty: "-",
      },
      puts: {
        oi: "7,891",
        changeInOi: "7,891",
        volume: "42.29",
        iv: "0.05",
        ltp: "-0.95",
        change: "0.05",
        bidQty: "72,300",
        bid: "5,40,410",
        ask: "-",
        askQty: "-",
      },
      
    },
    // Add more rows as needed...
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Options Data</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border border-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="px-4 py-2">Strike</th>
              <th colSpan="9" className="px-4 py-2 text-center">Calls</th>
              <th colSpan="9" className="px-4 py-2 text-center">Puts</th>
            </tr>
            <tr>
              <th className="px-4 py-2"></th>
              {["OI", "Chng in OI", "Volume", "IV", "LTP", "Chng", "Bid Qty", "Bid", "Ask", "Ask Qty"].map((header, index) => (
                <th key={`calls-header-${index}`} className="px-4 py-2">{header}</th>
              ))}
              {["Bid Qty", "Bid", "Ask", "Ask Qty", "Chng", "LTP", "IV", "Volume", "Chng in OI", "OI"].map((header, index) => (
                <th key={`puts-header-${index}`} className="px-4 py-2">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-900">{row.strike}</td>
                <td className="px-4 py-2">{row.calls.oi}</td>
                <td className="px-4 py-2">{row.calls.changeInOi}</td>
                <td className="px-4 py-2">{row.calls.volume}</td>
                <td className="px-4 py-2">{row.calls.iv}</td>
                <td className="px-4 py-2">{row.calls.ltp}</td>
                <td className="px-4 py-2">{row.calls.change}</td>
                <td className="px-4 py-2">{row.calls.bidQty}</td>
                <td className="px-4 py-2">{row.calls.bid}</td>
                <td className="px-4 py-2">{row.calls.ask}</td>
                <td className="px-4 py-2">{row.calls.askQty}</td>
                <td className="px-4 py-2">{row.puts.bidQty}</td>
                <td className="px-4 py-2">{row.puts.bid}</td>
                <td className="px-4 py-2">{row.puts.ask}</td>
                <td className="px-4 py-2">{row.puts.askQty}</td>
                <td className="px-4 py-2">{row.puts.change}</td>
                <td className="px-4 py-2">{row.puts.ltp}</td>
                <td className="px-4 py-2">{row.puts.iv}</td>
                <td className="px-4 py-2">{row.puts.volume}</td>
                <td className="px-4 py-2">{row.puts.changeInOi}</td>
                <td className="px-4 py-2">{row.puts.oi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OptionsData;
