import React, { useEffect, useState } from 'react';

const WebSocketComponent = ({ selectedData, onPriceUpdate }) => {
  const [socket, setSocket] = useState(null);
  const heartbeatInterval = 60000;
  const touchlineInterval = 5000;
  let heartbeatTimer;
  let touchlineTimer;

  useEffect(() => {
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
        ws.send(JSON.stringify({
          t: 't',
          k: `${selectedData.exchange}|${selectedData.token_id}`,
        }));
      }, touchlineInterval);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.lp) {
          onPriceUpdate(data.lp);
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
      ws.close();
      clearInterval(heartbeatTimer);
      clearInterval(touchlineTimer);
    };
  }, [selectedData, onPriceUpdate]);

  return null; // No need to render anything as we're just handling the WebSocket
};

