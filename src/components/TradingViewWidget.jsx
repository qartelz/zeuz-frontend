import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const TradingViewWidget = () => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    // Chart options
    const chartOptions = {
      layout: {
        textColor: 'black',
        background: { type: 'solid', color: 'white' },
      },
    };

    // Create the chart inside the div container
    const chart = createChart(chartContainerRef.current, chartOptions);

    // Add a candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',    // Color for upward candles (green)
      downColor: '#ef5350',  // Color for downward candles (red)
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    // Data for candlestick chart
    const data = [
      { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
      { open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: 1642514276 },
      { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
      { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
      { open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: 1642773476 },
      { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
      { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 1642946276 },
      { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 1643032676 },
      { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 1643119076 },
      { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
    ];

    // Set data to the candlestick series
    candlestickSeries.setData(data);

    // Adjust the time scale to fit the content
    chart.timeScale().fitContent();

    // Clean up the chart when the component unmounts
    return () => {
      chart.remove();
    };
  }, []);

  return <div ref={chartContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default TradingViewWidget;
