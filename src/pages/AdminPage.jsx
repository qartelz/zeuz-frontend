import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const callbackUrl = 'https://uat-frontend.enrichmoney.in:3018/partner/login?partner=KE0070'; 
  const [jwtToken, setJwtToken] = useState(null);

  const handleButtonClick = () => {
    window.location.href = callbackUrl;
  };

  useEffect(() => {
    // Extract the JWT token from the URL's search parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('x-authorization'); // Get the token from "x-authorization"
    if (token) {
      setJwtToken(token);
    }
  }, [window.location.search]);
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Admin Page</h1>
        <button
          onClick={handleButtonClick}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200 mb-4"
        >
          Go to Callback URL
        </button>
        
        {jwtToken && (
          <p className="mt-4 max-w-sm mx-auto text-gray-700">{jwtToken}</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;

