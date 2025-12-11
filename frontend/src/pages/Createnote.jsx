import React from "react";
import Noteform from "../components/Noteform";

function Createnote() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-xl shadow-lg">
        
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">
          Create New Note
        </h2>

        <Noteform />
      </div>
    </div>
  );
}

export default Createnote;
