import React from 'react';

const VerifyRequest = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Check Your Email
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300">
          A sign-in link has been sent to your email address. Please check your email and follow the link to sign in.
        </p>
      </div>
    </div>
  );
};

export default VerifyRequest;