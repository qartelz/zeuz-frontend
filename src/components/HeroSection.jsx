import React from "react";
import LearnSvg from "../assets/svg/LearnSvg";
import NewChartSvg from "../assets/svg/NewChartSvg";
import FirstTradeSvg from "../assets/svg/FirstTradeSvg";
import { useNavigate } from 'react-router-dom';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import BagSvg from "../assets/svg/BagSvg";
import OverallSvg from "../assets/svg/OverallSvg";


const HeroSection = ({ username, welcomemsg, question, answers }) => {



  const AssetBox = ({ title, subtitle, Icon, amount, percentage }) => (
    <div className="bg-white rounded-lg shadow-md mb-6 px-10 py-3 w-lg max-w-sm">
      <h3 className="text-lg text-[#0E8190] font-semibold mb-2 text-left">
        {title}
      </h3>
      <h2 className="text-2xl font-bold mb-4 text-left">{subtitle}</h2>
      <div className="bg-[#F6FEFF] w-full rounded-md flex items-center p-2">
        <div className="w-8 h-8 text-white rounded-full flex items-center justify-center mr-4">
        <Icon />
        </div>
        <p className="text-xl font-semibold text-left mr-2">{amount}</p>
        <p className="text-xl font-semibold text-left">(+{percentage}%)</p>
      </div>
    </div>
  );



  const navigate = useNavigate();
  
const trades = [
  { name: 'AAPL', quantity: 10, pl: '+$200', invested: '$1000',type:'Buy' },
  { name: 'MSFT', quantity: 5, pl: '-$50', invested: '$750' ,type:'Sell' },
  { name: 'GOOG', quantity: 8, pl: '+$320', invested: '$1200' ,type:'Buy' },
  { name: 'AMZN', quantity: 12, pl: '+$500', invested: '$3000' ,type:'Sell' },
  
];


const navigateToAllTrades = () => {
  navigate('/all-trades');
};


  return (
    <div className="p-6">
      <div className="rounded-lg border border-gray-300 bg-[#DFF9FD] mx-auto sm:max-w-4xl shadow-md sm:flex relative">
  <div className="flex-1 sm:w-4/6 p-10">
    <h2 className="text-4xl font-extrabold  text-black">
      {welcomemsg} <span className="text-[#0E8190]">{username || "User"}!</span>
    </h2>
    <div className="mt-4">
      <p className="font-bold font  text-black">{question}</p>
      <p className="mt-2 space-y-1 sm:w-[80%] text-sm text-black">
        {answers}
      </p>

      <a href="/practice">
                <button className="mt-4 px-6 py-2 bg-black text-white rounded-lg font-semibold transition-transform duration-400  hover:scale-105">
                  Start a New Trade
                </button>
                </a>
       
    </div>
  </div>

  {/* SVG Container */}
  <div className="sm:w-1/3 flex justify-center items-center p-4">
    <LearnSvg className="w-full h-auto max-w-[200px]" />
  </div>
</div>


      <div className="lg:px-24 py-6 w-full">
        <div className="mt-4 flex-col lg:flex-row sm:flex space-y-4 sm:space-y-0 space-x-4  mx-auto">
          <div className=" lg:flex-1 lg:w-2/4 ">
            <h3 className="text-3xl  font-bold text-black mb-4">
              Your Learning Portfolio
            </h3>


            <div className="p-4 rounded-2xl border border-gray-300 bg-[#F6FEFF] shadow-md">


              {/* <div className="mt-4 flex flex-col items-center">
                <div className="rounded-lg  w-full flex items-center justify-center p-6">
                  <NewChartSvg />
                </div>
                <p className="mt-4 text-center text-3xl font-bold text-black">
                  You Haven’t Made <br /> Your{" "}
                  <div className="inline-block text-[#0E8190]">
                    First Trade
                    <FirstTradeSvg />
                  </div>
                  Yet!
                </p>
                <a href="/practice">
                <button className="mt-4 px-6 py-2 bg-black text-white rounded-lg font-semibold transition-transform duration-400  hover:scale-105">
                  Start a New Trade
                </button>
                </a>
              </div> */}



              <div className="max-w-4xl mx-auto mt-8 p-4">
      
      {trades.map((trade, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-white rounded-lg  mb-4"
        >
          {/* Left Side: Stock Name */}
          <div className="flex-1 text-lg font-semibold text-gray-700">{trade.name}</div>

          {/* Right Side: Details Horizontally */}
          <div className="flex flex-1 justify-between items-center space-x-8">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500">Trade Type</div>
              <div className="text-lg font-semibold text-gray-800">{trade.type}</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500">Quantity</div>
              <div className="text-lg font-semibold text-gray-800">{trade.quantity}</div>
            </div>

            <div className="text-center">
              <div className="text-sm font-medium text-gray-500">P/L</div>
              <div
                className={`text-lg font-semibold ${
                  trade.pl.startsWith('-') ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {trade.pl}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500">Invested</div>
              <div className="text-lg font-semibold text-gray-800">{trade.invested}</div>
            </div>
          </div>

          {/* Icon */}
          <EllipsisVerticalIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
        </div>
      ))}
      {/* Button to Navigate */}
      <div className="mt-6 text-right">
        <button
          onClick={navigateToAllTrades}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          All Trades <span className="ml-2">»</span>
        </button>
      </div>
    </div>

    

            </div>


            
          </div>

          <div className="  ">
            <h3 className="text-3xl  font-bold text-black  ">My Assets</h3>



            <div className="p-4 rounded-lg ">
              <div className="mt-0 flex-col justify-between space-y-4">
                {/* Total Portfolio */}
                <div className="flex-1  rounded-lg bg-white border shadow-md w-80 px-6 py-3 flex flex-col ">
                  <p className="text-lg   font-semibold text-[#0E8190]">
                    Total
                  </p>
                  <p className="text-3xl mb-4 font-semibold text-black">
                    Portfolio Value
                  </p>
                  {/* <span className="text-sm italic  text-center   text-black">
                    Your portfolio is stocked with 300,000 BTLS. Ready to see
                    how they grow?
                  </span> */}

<div className="bg-[#F6FEFF] w-full rounded-md flex items-center p-2">
        <div className="w-8 h-8 text-white rounded-full flex items-center justify-center mr-4">
          <BagSvg />
        </div>
        <p className="text-lg  text-left mr-2">10</p>
        <p className="text-lg  text-left">(+20%)</p>
      </div>
                </div>
                {/* Profit and Loss */}
                <div className="flex-1  rounded-lg bg-white border shadow-md w-80 px-6 py-3 flex flex-col ">
                  <p className="text-lg   font-semibold text-[#0E8190]">
                    Overall
                  </p>
                  <p className="text-3xl mb-4 font-semibold text-black">
                   Profit & Loss
                  </p>
{/* 
                  <span className="text-sm italic  text-center   text-black">
                  You haven't made any trades yet. Once you do, we'll track your profits and losses here!
                  </span> */}


                  
<div className="bg-[#F6FEFF] w-full rounded-md flex items-center p-2">
        <div className="w-8 h-8 text-white rounded-full flex items-center justify-center mr-4">
         <OverallSvg/>
        </div>
        <p className="text-lg  text-left mr-2">10</p>
        <p className="text-lg  text-left">(+20%)</p>
      </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
