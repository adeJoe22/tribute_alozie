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
    <main className='min-h-screen bg-gray-50 dark:bg-gray-900 relative'>
      {/* See Table Button */}
      <Link
        to='/table'
        className='hidden md:block absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-500 transition'
      >
        See Table
      </Link>

      <div className='container px-4 py-8 mx-auto max-w-5xl'>
        <div className='flex flex-col items-center justify-center mb-12 text-center'>
          <h1 className='mb-4 text-3xl font-bold text-gray-800 dark:text-gray-100 md:text-4xl lg:text-5xl'>
            In Loving Memory
          </h1>
          <h2 className='mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200 md:text-3xl'>
            Deaconess Anna Alozie
          </h2>
          <p className='max-w-2xl mb-8 text-gray-600 dark:text-gray-300'>
            "Those we love don't go away, they walk beside us every
            day."
          </p>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8'>
            <div className='relative aspect-square overflow-hidden rounded-lg shadow-lg'>
              <img
                src={img || "/placeholder.svg"}
                alt='Deaconess Anna Alozie'
                className='object-cover w-full h-full'
              />
            </div>
            <div className='relative aspect-square overflow-hidden rounded-lg shadow-lg'>
              <img
                src={img4 || "/placeholder.svg"}
                alt='Deaconess Anna Alozie'
                className='object-cover w-full h-full'
              />
            </div>
            <div className='relative aspect-square overflow-hidden rounded-lg shadow-lg'>
              <img
                src={img2 || "/placeholder.svg"}
                alt='Deaconess Anna Alozie'
                className='object-cover w-full h-full'
              />
            </div>
            <div className='relative aspect-square overflow-hidden rounded-lg shadow-lg'>
              <img
                src={img3 || "/placeholder.svg"}
                alt='Deaconess Anna Alozie'
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
            Burial Arrangements
          </h3>

          <div className='grid gap-6 md:grid-cols-2'>
            {/* Service of Songs Card */}
            <div className='p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800'>
              <h4 className='mb-3 text-xl font-semibold text-gray-800 dark:text-gray-100'>
                Service of Songs
              </h4>
              <div className='space-y-2 text-gray-600 dark:text-gray-300'>
                <p>
                  <span className='font-medium'>Date:</span> Tuesday,
                  22nd April 2025
                </p>
                <p>
                  <span className='font-medium'>Venue:</span> Christ
                  Embassy Amazing Grace Arena, Ikorodu Central Group
                  Church
                </p>
                <p>
                  <span className='font-medium'>Address:</span> No 75
                  Lagos Road, Haruna Bus Stop Ikorodu
                </p>
                <p>
                  <span className='font-medium'>Time:</span> 4:00 PM
                </p>
              </div>
            </div>

            {/* Funeral Service Card */}
            <div className='p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800'>
              <h4 className='mb-3 text-xl font-semibold text-gray-800 dark:text-gray-100'>
                Funeral Service and Interment
              </h4>
              <div className='space-y-2 text-gray-600 dark:text-gray-300'>
                <p>
                  <span className='font-medium'>Date:</span> Friday,
                  25th April 2025
                </p>
                <p>
                  <span className='font-medium'>Venue:</span> Alozie's
                  Compound, Umuebie Eberi
                </p>
                <p>
                  <span className='font-medium'>Address:</span> Omuma
                  Local Government Area, Rivers State
                </p>
                <p>
                  <span className='font-medium'>Time:</span> 10:00 AM
                </p>
              </div>
            </div>
          </div>

          {/* RSVP Section */}
          <div className='mt-8 p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800'>
            <h4 className='mb-4 text-xl font-semibold text-center text-gray-800 dark:text-gray-100'>
              RSVP
            </h4>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='text-center'>
                <p className='font-medium text-gray-800 dark:text-gray-100'>
                  OBINNA ALOZIE
                </p>
                <p className='text-gray-600 dark:text-gray-300'>
                  08076256846
                </p>
              </div>
              <div className='text-center'>
                <p className='font-medium text-gray-800 dark:text-gray-100'>
                  PRINCE U AMADI ESQ
                </p>
                <p className='text-gray-600 dark:text-gray-300'>
                  08033167214
                </p>
              </div>
            </div>
          </div>
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
