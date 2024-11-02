import React from "react";
import LearnSvg from "../assets/svg/LearnSvg";
import NewChartSvg from "../assets/svg/NewChartSvg";
import FirstTradeSvg from "../assets/svg/FirstTradeSvg";

const HeroSection = ({ username, welcomemsg, question, answers }) => {
  return (
    <div className="p-6 min-h-screen">
      <div className=" rounded-lg border border-gray-300 bg-[#DFF9FD]   mx-auto sm:max-w-4xl shadow-md sm:flex">
        <div className="flex-1  sm:w-4/6 p-10">
          <h2 className="text-3xl font-bold text-black">
            {welcomemsg} <span className="text-[#0E8190]">{username}!</span>
          </h2>
          <div className="mt-4">
            <p className="font-medium text-black">{question}</p>
            <p className="mt-2 space-y-1 sm:w-[80%] text-sm text-black">
              {answers}
            </p>
          </div>
        </div>

        <div className=" sm:w-2/6   flex  ">
          <LearnSvg />
        </div>
      </div>

      <div className="lg:px-24 py-6 w-full">
        <div className="mt-4 flex-col lg:flex-row sm:flex space-y-4 sm:space-y-0 space-x-4  mx-auto">
          <div className=" lg:flex-1 lg:w-2/4 ">
            <h3 className="text-3xl  font-bold text-black mb-4">
              Your Learning Portfolio
            </h3>
            <div className="p-4 rounded-2xl border border-gray-300 bg-[#F6FEFF] shadow-md">
              <div className="mt-4 flex flex-col items-center">
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
                <button className="mt-4 px-6 py-2 bg-black text-white rounded-lg font-semibold transition-transform duration-400  hover:scale-105">
                  Start a New Trade
                </button>
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
                  <span className="text-sm italic  text-center   text-black">
                    Your portfolio is stocked with 300,000 BTLS. Ready to see
                    how they grow?
                  </span>
                </div>
                {/* Profit and Loss */}
                <div className="flex-1  rounded-lg bg-white border shadow-md w-80 px-6 py-3 flex flex-col ">
                  <p className="text-lg   font-semibold text-[#0E8190]">
                    Overall
                  </p>
                  <p className="text-3xl mb-4 font-semibold text-black">
                   Profit & Loss
                  </p>
                  <span className="text-sm italic  text-center   text-black">
                  You haven't made any trades yet. Once you do, we'll track your profits and losses here!
                  </span>
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
