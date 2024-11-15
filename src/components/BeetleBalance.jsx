import React from 'react';
import { PlusIcon } from "@heroicons/react/24/outline";
import CoinSvg from '../assets/svg/CoinSvg';

const BeetleBalance = () => {
  return (
    <div className="flex items-center justify-between p-6 w-full max-w-md">
      <div className="bg-gray-200 rounded-full h-20 w-20 flex items-center justify-center">
        <CoinSvg />
      </div>

      <div className="ml-4">
        <div className="text-4xl text-[#BF9900] font-extrabold">
          Beetle Balance
        </div>
        <div className="text-4xl flex items-center font-extrabold">
          1000
          <div className="flex items-end">
            <div className="text-xl font-medium mt-2 ml-2">/ 5000</div>
          </div>
          <div className="flex items-center">
            <PlusIcon className="h-6 w-6 text-blue-500 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeetleBalance;
