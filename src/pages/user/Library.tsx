import React from "react";

const UserLibrary = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-dark-700 rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Your Library</h1>
        <p className="text-gray-400">You have not saved any manga or anime yet.</p>
      </div>
    </div>
  );
};

export default UserLibrary;