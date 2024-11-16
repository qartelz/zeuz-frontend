import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const heartbeatInterval = 60000; // 1 minute in milliseconds
  let heartbeatTimer;

  useEffect(() => {
    // Initialize WebSocket
    const ws = new WebSocket('wss://orca-uatwss.enrichmoney.in/ws');

    // Open WebSocket and send initial data
    ws.onopen = () => {
      console.log('WebSocket connected');
      const initialData = {
        t: 'c',
        uid: 'AB121627',
        actid: 'AB121627',
        susertoken: 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Nzby5lbnJpY2htb25leS5pbi9vcmcvaXNzdWVyIiwiaWF0IjoxNzMxNjQ4NDc5LCJleHAiOjE3MzE3MTcwMDAsInN1YmplY3RfaWQiOiJBQjEyMTYyNyIsInBhcnRuZXJfY2hhbm5lbCI6IkFQSSIsInBhcnRuZXJfY29kZSI6IklOU1RBT1BUSU9OUyIsInVzZXJfaWQiOiJBQjEyMTYyNyIsImxhc3RfdmFsaWRhdGVkX2RhdGVfdGltZSI6MTczMTY0ODQ3OTY3MywiaXNzdWVyX2lkIjoiaHR0cHM6Ly9zc28uZW5yaWNobW9uZXkuaW4vb3JnL2lzc3VlciJ9.lkrWU1aiJd8OHpIBtPRiH06-JjB6ItZp11R269qKlng',
        source: 'API',
      };
      ws.send(JSON.stringify(initialData));

      // Start sending heartbeats
      heartbeatTimer = setInterval(() => {
        const heartbeatData = { t: 'h' };
        ws.send(JSON.stringify(heartbeatData));
        console.log('Heartbeat sent:', heartbeatData);
      }, heartbeatInterval);
    };

    // Handle incoming messages
    ws.onmessage = (event) => {
      console.log('Message received:', event.data);
      setMessage(event.data);
    };

    // Handle WebSocket errors
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Handle WebSocket closure
    ws.onclose = () => {
      console.log('WebSocket disconnected');
      clearInterval(heartbeatTimer); // Stop sending heartbeats
    };

    setSocket(ws);

    // Clean up on component unmount
    return () => {
      ws.close();
      clearInterval(heartbeatTimer); // Ensure timer is cleared
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Example</h1>
      <p>Received Message: {message}</p>
    </div>
  );
};

export default WebSocketComponent;
