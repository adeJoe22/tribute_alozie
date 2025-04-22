import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Tribute } from "../lib/types";

interface TributeTableProps {
  tributes: Tribute[];
}

const TributeTable: React.FC<TributeTableProps> = ({ tributes }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const tributesPerPage = 10;

  const totalPages = Math.ceil(tributes.length / tributesPerPage);

  const handleClickRow = (tribute: Tribute) => {
    navigate(`/tribute/${tribute._id}`, { state: { tribute } });
  };

  const getPaginatedTributes = () => {
    const start = (currentPage - 1) * tributesPerPage;
    const end = start + tributesPerPage;
    return tributes.slice(start, end);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    // First 5 pages always
    for (let i = 1; i <= Math.min(5, totalPages); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded ${
            i === currentPage
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {i}
        </button>,
      );
    }

    // Add ellipsis and last page if needed
    if (totalPages > 5) {
      pages.push(
        <span key='dots' className='px-2'>
          ...
        </span>,
      );
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {totalPages}
        </button>,
      );
    }

    return pages;
  };

  return (
    <div className='p-6'>
      <button
        onClick={() => navigate(-1)}
        className='mb-5 text-gray-800 hover:underline text-sm'
      >
        ← Back to home
      </button>
      <div className='overflow-x-auto border rounded'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-100 dark:bg-gray-800'>
            <tr>
              <th className='px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200'>
                Name
              </th>
              <th className='px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200'>
                Relationship
              </th>
              <th className='px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200'>
                Message
              </th>
              <th className='px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200'>
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedTributes().map((tribute) => (
              <tr
                key={tribute._id}
                onClick={() => handleClickRow(tribute)}
                className='cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700'
              >
                <td className='px-4 py-2'>{tribute.name}</td>
                <td className='px-4 py-2'>
                  {tribute.relationship.slice(0, 30)} ...
                </td>
                <td className='px-4 py-2'>
                  {tribute.message.slice(0, 50)}...
                </td>
                <td className='px-4 py-2'>
                  {tribute.date &&
                    new Date(tribute.date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className='flex justify-center items-center gap-2 mt-6 flex-wrap'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'
        >
          Back
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TributeTable;
