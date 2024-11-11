import React from 'react';

const AdminPage = () => {
  const callbackUrl = 'https://uat-frontend.enrichmoney.in:3018/partner/login?partner=KE0070'; 
  const handleButtonClick = () => {
 
    window.location.href = callbackUrl;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Page</h1>
      <button
        onClick={handleButtonClick}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
      >
        Go to Callback URL
      </button>
    </div>
  );
};

export default AdminPage;
