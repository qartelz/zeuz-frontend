import React from 'react'
import Navbar from '../components/Navbar'
// import PracticeSvg from '../assets/svg/PracticeSvg'

const PracticePage = () => {
  return (
    <div>
        <Navbar/>
        <div className="flex flex-row h-screen items-center justify-between">
      {/* Left Section */}
      <div className="flex flex-col justify-end space-y-4 w-1/2 p-8">
        <h1 className="text-4xl font-bold">Main Heading</h1>
        <h2 className="text-xl text-gray-700">Subheading Text</h2>
        <p className="text-base text-gray-600">
          This is the paragraph where you can add more details. It provides additional context or
          information about the heading and subheading.
        </p>
        <div className="flex space-x-4 mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Button 1</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg">Button 2</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Button 3</button>
        </div>
      </div>

      {/* Right SVG Section */}
      <div className="w-1/2 h-[70vh] flex items-center justify-center">
      {/* <PracticeSvg/> */}
      </div>
    </div>     
    </div>
  )
}

export default PracticePage
