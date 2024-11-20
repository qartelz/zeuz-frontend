import React from "react";
import Navbar from "../components/Navbar";
import OpenOrders from "../components/OpenOrders";
import ClosedOrders from "../components/ClosedOrders";

const TradesPage = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-8 p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Open Positions.
        </h1>

        <OpenOrders />

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Closed Positions.
          </h2>
          <ClosedOrders />
        </section>
      </div>
    </>
  );
};

export default TradesPage;
