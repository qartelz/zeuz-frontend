import React, { useState, useEffect } from "react";

const StockInfo = ({ selectedData, stocks, result }) => {
  const [lastPrice, setLastPrice] = useState(selectedData?.strike_price || "0.00");
  const [Volume, setVolume] = useState("0.00");
  const [percentChange, setPercentChange] = useState("0.00");


  const [selectedMarket, setSelectedMarket] = useState("All Markets");
  const [showStockDropdown, setShowStockDropdown] = useState(false);
  const [showMarketDropdown, setShowMarketDropdown] = useState(false);
  const [socket, setSocket] = useState(null);
  
  const data = [
    { value: `${percentChange}%`, label: "24h Change" },
    { value: "+1.25%", label: "24h High" },
    { value: "+1.25%", label: "24h Low" },
    { value: Volume, label: "Market Volume" },
  ];

  useEffect(() => {
    const heartbeatInterval = 60000;
    const touchlineInterval = 5000;
    let heartbeatTimer;
    let touchlineTimer;

    const ws = new WebSocket('wss://orca-uatwss.enrichmoney.in/ws');

    ws.onopen = () => {
      console.log('WebSocket connected');
      
      const initialData = {
        t: 'c',
        uid: 'AB121627',
        actid: 'AB121627',
        susertoken: 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Nzby5lbnJpY2htb25leS5pbi9vcmcvaXNzdWVyIiwiaWF0IjoxNzMxOTAwMjI5LCJleHAiOjE3MzQ0ODE4MDAsInN1YmplY3RfaWQiOiJBQjEyMTYyNyIsInBhcnRuZXJfY2hhbm5lbCI6ImVhc3lhbGdvIiwicGFydG5lcl9jb2RlIjoiRU5SSUNIIiwidXNlcl9pZCI6IkFCMTIxNjI3IiwibGFzdF92YWxpZGF0ZWRfZGF0ZV90aW1lIjoxNzMxOTAwMjI5ODMyLCJpc3N1ZXJfaWQiOiJodHRwczovL3Nzby5lbnJpY2htb25leS5pbi9vcmcvaXNzdWVyIn0.JmuaiI0NpalEf2p9VMgFW4nSJY64j_FCjl1dKrTOK4o',
        source: 'API',
      };
      ws.send(JSON.stringify(initialData));

      heartbeatTimer = setInterval(() => {
        ws.send(JSON.stringify({ t: 'h' }));
      }, heartbeatInterval);

      touchlineTimer = setInterval(() => {
        if (selectedData) {
          ws.send(JSON.stringify({
            t: 't',
            k: `${selectedData.exchange}|${selectedData.token_id}`,
          }));
        }
      }, touchlineInterval);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
    
        if (data.lp) {
          setLastPrice(data.lp); // Assuming setLastPrice is your state setter for last price
        }
    
        if (data.v) {
          setVolume(data.v); // Replace setVolume with your appropriate state setter
        }
    
        if (data.pc ){
          setPercentChange(data.pc); // Replace setTradeFlag with your appropriate state setter
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      clearInterval(heartbeatTimer);
      clearInterval(touchlineTimer);
    };

    setSocket(ws);

    return () => {
      if (ws) {
        ws.close();
      }
      clearInterval(heartbeatTimer);
      clearInterval(touchlineTimer);
    };
  }, [selectedData]);

  return (
    <div className="p-4 bg-white border rounded-md flex justify-between items-center space-x-4">
      <div className="relative">
        <div className="flex items-center space-x-2 cursor-pointer whitespace-nowrap">
          <span className="font-bold">{selectedData?.display_name}</span>
        </div>
      </div>

      <div className="h-10 w-px bg-gray-500 mx-4 hidden md:block" />

      <div className="flex flex-wrap items-center space-x-4 space-y-2">
        <div className="text-left whitespace-nowrap">
          <p className="text-lg font-bold">{lastPrice}</p>
          <p className="text-sm text-gray-400">Last Traded Price</p>
        </div>
      </div>

      <div className="h-10 w-px bg-gray-500 mx-4 hidden md:block" />
      
      <div className="flex space-x-9">
        {data.map((item, index) => (
          <div key={index} className="text-center whitespace-nowrap">
<p
      className={`text-lg font-semibold ${
        item.label === "24h Change"
          ? parseFloat(item.value) > 0
            ? "text-green-500"
            : parseFloat(item.value) < 0
            ? "text-red-500"
            : "text-gray-500"
          : ""
      }`}
    >
      {item.value}
    </p>

            <p className="text-sm text-gray-400">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockInfo;

