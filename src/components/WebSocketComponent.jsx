import React, { createContext, useContext, useEffect, useState } from "react";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children, selectedData }) => {
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
        susertoken:
          "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Nzby5lbnJpY2htb25leS5pbi9vcmcvaXNzdWVyIiwiaWF0IjoxNzMyMDA2MDc1LCJleHAiOjE3MzIwODI0MDAsInN1YmplY3RfaWQiOiJLRTAwNzAiLCJwYXJ0bmVyX2NoYW5uZWwiOiJBUEkiLCJwYXJ0bmVyX2NvZGUiOiJLRTAwNzAiLCJ1c2VyX2lkIjoiS0UwMDcwIiwibGFzdF92YWxpZGF0ZWRfZGF0ZV90aW1lIjoxNzMyMDA2MDc1NjYyLCJpc3N1ZXJfaWQiOiJodHRwczovL3Nzby5lbnJpY2htb25leS5pbi9vcmcvaXNzdWVyIn0.J7UNVR1jcR6VN5HwheKTLFLWxAe2Zd3Fg6wKLE09Qg8",
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

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider
      value={{ lastPrice, volume, percentChange }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
