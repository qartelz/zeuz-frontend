
import React, { createContext, useContext, useEffect, useState, useRef } from "react";

const WebSockeTradeContext = createContext(null);

export const WebSocketTrade = ({ children, trades, selectedData }) => {
  const [prices, setPrices] = useState({}); 
  const [volumes, setVolumes] = useState({}); // { token_id: volume }
  const [percentChanges, setPercentChanges] = useState({}); // { token_id: percentChange }
  const [ws, setWs] = useState(null);
  const previousPrices = useRef({}); // To store previous prices for percentChange calculation

  useEffect(() => {
    const heartbeatInterval = 60; // 60 seconds
    let heartbeatTimer;

    const wsInstance = new WebSocket("wss://orca-uatwss.enrichmoney.in/ws");

    wsInstance.onopen = () => {
      console.log("WebSocket connected");

      const initialData = {
        t: "c",
        uid: "KE0070",
        actid: "KE0070",
        susertoken: "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Nzby5lbnJpY2htb25leS5pbi9vcmcvaXNzdWVyIiwiaWF0IjoxNzMyMjIxODU4LCJleHAiOjE3MzIyNTUyMDAsInN1YmplY3RfaWQiOiJLRTAwNzAiLCJwYXJ0bmVyX2NoYW5uZWwiOiJBUEkiLCJwYXJ0bmVyX2NvZGUiOiJLRTAwNzAiLCJ1c2VyX2lkIjoiS0UwMDcwIiwibGFzdF92YWxpZGF0ZWRfZGF0ZV90aW1lIjoxNzMyMjIxODU4Njk4LCJpc3N1ZXJfaWQiOiJodHRwczovL3Nzby5lbnJpY2htb25leS5pbi9vcmcvaXNzdWVyIn0.xuLhdaYXg8_ICB5wR3o_z8FY0N_5V1xFXlBq54uWyyw", // Replace with actual token
        source: "API",
      };

      wsInstance.send(JSON.stringify(initialData));

      // Start heartbeat
      heartbeatTimer = setInterval(() => {
        wsInstance.send(JSON.stringify({ t: "h" }));
      }, heartbeatInterval);
    };

    wsInstance.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.tk) {
          const tokenId = data.tk;
          const newPrice = parseFloat(data.lp);

          setPrices((prevPrices) => ({
            ...prevPrices,
            [tokenId]: newPrice,
          }));

          // Calculate percent change
          const oldPrice = previousPrices.current[tokenId];
          if (oldPrice !== undefined && oldPrice !== 0) {
            const percentChange = ((newPrice - oldPrice) / oldPrice) * 100;
            setPercentChanges((prevPercentChanges) => ({
              ...prevPercentChanges,
              [tokenId]: percentChange.toFixed(2), // Round to 2 decimal places
            }));
          }

          // Update previous price
          previousPrices.current[tokenId] = newPrice;
        }

        if (data.tk && data.v) {
          const tokenId = data.tk;
          const volume = parseFloat(data.v);
          setVolumes((prevVolumes) => ({
            ...prevVolumes,
            [tokenId]: volume,
          }));
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    wsInstance.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    wsInstance.onclose = () => {
      console.log("WebSocket disconnected");
    };

    setWs(wsInstance);

    return () => {
      clearInterval(heartbeatTimer);
      wsInstance.close();
    };
  }, []);

  // Subscribe to trades
  useEffect(() => {
    if (!ws || ws.readyState !== WebSocket.OPEN || !trades) return;

    trades.forEach((trade) => {
      ws.send(
        JSON.stringify({
          t: "t",
          k: `${trade.exchange}|${trade.token_id}`,
        })
      );
    });

    return () => {
      trades.forEach((trade) => {
        ws.send(
          JSON.stringify({
            t: "u", // Unsubscribe
            k: `${trade.exchange}|${trade.token_id}`,
          })
        );
      });
    };
  }, [ws, trades]);

  // Subscribe to selectedData
  useEffect(() => {
    if (!ws || ws.readyState !== WebSocket.OPEN || !selectedData) return;

    const { exchange, token_id } = selectedData;

    ws.send(
      JSON.stringify({
        t: "t",
        k: `${exchange}|${token_id}`,
      })
    );

    return () => {
      ws.send(
        JSON.stringify({
          t: "u", // Unsubscribe
          k: `${exchange}|${token_id}`,
        })
      );
    };
  }, [ws, selectedData]);

  return (
    <WebSockeTradeContext.Provider value={{ prices, volumes, percentChanges }}>
      {children}
    </WebSockeTradeContext.Provider>
  );
};

export const useWebSocketTrade = () => useContext(WebSockeTradeContext);