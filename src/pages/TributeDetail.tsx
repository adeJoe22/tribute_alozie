import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Tribute } from "../lib/types";

const TributeDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tribute: Tribute = location.state?.tribute;

  if (!tribute)
    return <div className='text-center p-10'>No tribute found.</div>;

  return (
    <div className='min-h-screen bg-white text-gray-800 py-10 px-4 md:px-12 overflow-y-auto'>
      <div className='max-w-3xl mx-auto'>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className='mb-8 text-blue-600 hover:underline text-sm'
        >
          ← Back to tributes
        </button>

        <div className='text-center'>
          <h1 className='text-3xl font-bold mb-4'>{tribute.name}</h1>

          <p className='text-lg text-gray-600 mb-2'>
            Relationship:{" "}
            <span className='font-medium'>
              {tribute.relationship}
            </span>
          </p>

          <p className='text-sm text-gray-500 mb-6'>
            {tribute.date &&
              new Date(tribute.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </p>
        </div>

        {/* Tribute Message */}
        <div className='bg-gray-100 rounded-lg p-6 shadow-sm'>
          <p className='text-lg leading-relaxed whitespace-pre-wrap '>
            {tribute.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TributeDetail;
