import React, { useState } from "react";
import Navbar from "../components/Navbar";
// import { useState } from "react";
// import PracticeSvg from '../assets/svg/PracticeSvg'

const PracticePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    content: "",
    buttonColor: "",
    buttonText: "",
    contentLast:""
  });
  const openModal = (title, content, buttonColor, buttonText,contentLast) => {
    setModalContent({ title, content, buttonColor, buttonText,contentLast });
    setIsModalOpen(true);
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex flex-row h-screen items-center justify-between">
        {/* Left Section */}
        <div className="flex flex-col justify-end space-y-4 w-1/2 p-8">
          <h1 className="text-4xl font-bold">Start a New Trade</h1>
          <h2 className="text-xl text-gray-700">
            Choose a trade type to learn and practice.
          </h2>

          <div className="flex space-x-4 mt-4">
            <button
              // onClick={openModal}
              onClick={() =>
                openModal(
                  "Equity Trading: Build Ownership",
                  "Equity trading is all about buying and selling shares of companies. It's a great way to learn how to evaluate companies and understand how your investments grow.",
                  " bg-blue-500",
                  "Start Equity Trading",
                  "Ready to get started?",
                  
                )
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-lg w-[150px] h-[50px] sm:w-[180px] sm:h-[55px] md:w-[200px] md:h-[60px] lg:w-[220px] lg:h-[65px]"
            >
              Learn Equity
            </button>

            <button
              // onClick={openModal}
              onClick={() =>
                openModal(
                  "Futures Trading: Predict the Future",
                  "Futures allow you to trade contracts based on the future prices of commodities, stocks, and more. You'll learn how to predict market trends and hedge risks.",
                  "bg-green-500",
                  "Start Futures Trading",
                  "Dive in and start learning now!"
                )
              }
              className="px-4 py-2 bg-green-500 text-white rounded-lg w-[150px] h-[50px] sm:w-[180px] sm:h-[55px] md:w-[200px] md:h-[60px] lg:w-[220px] lg:h-[65px]"
            >
              Learn Futures
            </button>

            <button
              // onClick={openModal}
              onClick={() =>
                openModal(
                  "Options Trading: Flexible Contracts",
                  "Options trading lets you buy or sell contracts that give the right—but not the obligation—to trade at a specific price. It’s perfect for learning flexibility in trading strategies.",
                  "bg-red-500",
                  "Start Options Trading",
                  "Get started with options today!"
                )
              }
              className="px-4 py-2 bg-red-500 text-white rounded-lg w-[150px] h-[50px] sm:w-[180px] sm:h-[55px] md:w-[200px] md:h-[60px] lg:w-[220px] lg:h-[65px]"
            >
              Learn Options
            </button>
          </div>
        </div>

        {/* Right SVG Section */}
        <div className="w-1/2 h-[70vh] flex items-center justify-center">
          {/* <PracticeSvg/> */}
        </div>
      </div>
      {/* Modal */}
      {/* Modal */}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-[400px] h-auto md:h-[522px] p-4 md:p-6 flex flex-col">
            {/* Image Section */}
            <img
              src={modalContent.imageUrl}
              alt={modalContent.title}
              className="w-full h-[200px] md:h-[50%] object-cover rounded-t-lg"
            />

            {/* Content Section */}
            <div className="flex flex-col items-center justify-center text-center flex-grow mt-4">
              <h2 className="text-xl font-bold mb-2">{modalContent.title}</h2>
              <p className="text-gray-700 mb-4">{modalContent.content}</p>
              <p className="text-gray-700 mb-4">{modalContent.contentLast}</p>
            </div>

            {/* Close Button */}
            <button
              // onClick={closeModal}
              className={`px-4 py-2 text-white rounded-lg ${modalContent.buttonColor} mt-4`}
            >
              {modalContent.buttonText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticePage;
