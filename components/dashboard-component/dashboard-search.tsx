import React from "react";
import { PiFadersBold } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";

const DashboardSearch = () => {
  return (
    <div className="flex flex-row items-center gap-1">
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for places to go"
          className="border min-w-[267px] bg-[#E9F1FA] rounded-full h-[42px] pl-9"
        />
      </div>
      <button className="bg-[#0066F9] w-10 h-10 rounded-full flex items-center justify-center rotate-90">
        <PiFadersBold color="white" size={18}  />
      </button>
    </div>
  );
};

export default DashboardSearch;
