import React, { createContext, useContext, useEffect, useState } from "react";

const WebSocketStockContext = createContext(null);

export const WebSocketStock = ({ children, selectedData }) => {
  const [lastPrice, setLastPrice] = useState(selectedData?.strike_price || "0.00");
  const [volume, setVolume] = useState("0.00");
  const [percentChange, setPercentChange] = useState("0.00");

  useEffect(() => {
    const heartbeatInterval = 60000;
    const touchlineInterval = 5000;
    let heartbeatTimer;
    let touchlineTimer;
    const ws = new WebSocket("wss://orca-uatwss.enrichmoney.in/ws");

    ws.onopen = () => {
      console.log("WebSocket connected");

      const initialData = {
        t: "c",
        uid: "KE0070",
        actid: "KE0070",
        susertoken:"eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Nzby5lbnJpY2htb25leS5pbi9vcmcvaXNzdWVyIiwiaWF0IjoxNzMyMjIxODU4LCJleHAiOjE3MzIyNTUyMDAsInN1YmplY3RfaWQiOiJLRTAwNzAiLCJwYXJ0bmVyX2NoYW5uZWwiOiJBUEkiLCJwYXJ0bmVyX2NvZGUiOiJLRTAwNzAiLCJ1c2VyX2lkIjoiS0UwMDcwIiwibGFzdF92YWxpZGF0ZWRfZGF0ZV90aW1lIjoxNzMyMjIxODU4Njk4LCJpc3N1ZXJfaWQiOiJodHRwczovL3Nzby5lbnJpY2htb25leS5pbi9vcmcvaXNzdWVyIn0.xuLhdaYXg8_ICB5wR3o_z8FY0N_5V1xFXlBq54uWyyw",
        source: "API",
      };

      ws.send(JSON.stringify(initialData));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
      
        if (data.lp) {
          setLastPrice(data.lp); // Assuming setLastPrice is your state setter for last price
        }
        if (data.v) setVolume(data.v);
        if (data.pc) setPercentChange(data.pc);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
      heartbeatTimer = setInterval(() => {
        const heartbeatMessage = { t: "h" };
        console.log("Sending heartbeat message:", heartbeatMessage);
        ws.send(JSON.stringify(heartbeatMessage));
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

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, [selectedData]);

  return (
    <WebSocketStockContext.Provider
      value={{ lastPrice, volume, percentChange }}
    >
      {children}
    </WebSocketStockContext.Provider>
  );
};

export const useWebSocketStock = () => useContext(WebSocketStockContext);