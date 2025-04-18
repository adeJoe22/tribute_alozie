"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import TributeModal from "../components/TributeModal";
import type { Tribute } from "../lib/types";
import img from "../assets/tribute1.jpg";
import img2 from "../assets/tribute2.jpg";
import img3 from "../assets/tribute3.jpg";
import img4 from "../assets/tribute4.jpg";

interface HomePageProps {
  tributes: Tribute[];
  loading: boolean;
  onAddTribute: (tribute: Tribute) => void;
}

export default function HomePage({
  tributes,
  loading,
  onAddTribute,
}: HomePageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='container px-4 py-8 mx-auto max-w-5xl'>
        <div className='flex flex-col items-center justify-center mb-12 text-center'>
          <h1 className='mb-4 text-3xl font-bold text-gray-800 dark:text-gray-100 md:text-4xl lg:text-5xl'>
            In Loving Memory
          </h1>
          <h2 className='mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200 md:text-3xl'>
            Anna Alozie
          </h2>
          <p className='max-w-2xl mb-8 text-gray-600 dark:text-gray-300'>
            "Those we love don't go away, they walk beside us every
            day."
          </p>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8'>
            <div className='relative aspect-square overflow-hidden rounded-lg shadow-lg'>
              <img
                src={img}
                alt='Jane Doe'
                className='object-cover w-full h-full'
              />
            </div>
            <div className='relative aspect-square overflow-hidden rounded-lg shadow-lg'>
              <img
                src={img4}
                alt='Jane Doe'
                className='object-cover w-full h-full'
              />
            </div>
            <div className='relative aspect-square overflow-hidden rounded-lg shadow-lg'>
              <img
                src={img2}
                alt='Jane Doe'
                className='object-cover w-full h-full'
              />
            </div>
            <div className='relative aspect-square overflow-hidden rounded-lg shadow-lg'>
              <img
                src={img3}
                alt='Jane Doe'
                className='object-cover w-full h-full'
              />
            </div>
          </div>

          <div className='flex flex-wrap gap-4 justify-center'>
            <button
              onClick={() => setIsModalOpen(true)}
              className='px-6 py-2 text-white transition-colors bg-gray-700 rounded-md hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500'
            >
              Add Tribute
            </button>
            <Link
              to='/tributes'
              className='px-6 py-2 text-gray-700 transition-colors bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
            >
              See All Tributes
            </Link>
          </div>
        </div>

        <div className='mb-12'>
          <h3 className='mb-6 text-2xl font-semibold text-center text-gray-700 dark:text-gray-200'>
            Recent Tributes
          </h3>

          {loading ? (
            <div className='p-8 text-center border rounded-lg shadow-sm'>
              <p className='text-gray-500 dark:text-gray-400'>
                Loading tributes...
              </p>
            </div>
          ) : tributes.length > 0 ? (
            <div className='grid gap-4 md:grid-cols-2'>
              {tributes.slice(0, 2).map((tribute, index) => (
                <div
                  key={tribute._id || index}
                  className='p-6 border rounded-lg shadow-sm'
                >
                  <blockquote className='mb-4 italic text-gray-600 dark:text-gray-300'>
                    "{tribute.message}"
                  </blockquote>
                  <div className='flex flex-col'>
                    <span className='font-semibold text-gray-800 dark:text-gray-100'>
                      {tribute.name}
                    </span>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      {tribute.relationship}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='p-8 text-center border rounded-lg shadow-sm'>
              <p className='text-gray-500 dark:text-gray-400'>
                No tributes yet. Be the first to share your memories.
              </p>
            </div>
          )}

          {tributes.length > 2 && (
            <div className='mt-6 text-center'>
              <Link
                to='/tributes'
                className='text-gray-700 underline hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
              >
                View more tributes
              </Link>
            </div>
          )}
        </div>
      </div>

      <TributeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTribute={onAddTribute}
      />
    </main>
  );
}
