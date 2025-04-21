"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import type { Tribute } from "../lib/types";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface TributeCarouselProps {
  tributes: Tribute[];
}

export default function TributeCarousel({
  tributes,
}: TributeCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const itemsPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(tributes.length / itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }

    if (isRightSwipe) {
      handlePrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 15000);

    return () => clearInterval(interval);
  }, [currentPage, totalPages]);

  const startIndex = currentPage * itemsPerPage;
  const visibleTributes = tributes.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className='relative'>
      <div
        ref={carouselRef}
        className='relative overflow-hidden'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`grid gap-4 transition-transform duration-500 ease-in-out ${
            isMobile ? "" : "md:grid-cols-2"
          }`}
          style={{
            transform: isMobile
              ? `translateX(-${currentPage * 100}%)`
              : "none",
          }}
        >
          {isMobile
            ? visibleTributes.map((tribute, index) => (
                <TributeCard
                  key={tribute._id || index}
                  tribute={tribute}
                />
              ))
            : tributes.map((tribute, index) => (
                <div
                  key={tribute._id || index}
                  className={`transition-opacity duration-500 ${
                    index >= startIndex &&
                    index < startIndex + itemsPerPage
                      ? "opacity-100"
                      : "hidden"
                  }`}
                >
                  <TributeCard tribute={tribute} />
                </div>
              ))}
        </div>
      </div>

      {/* {totalPages > 1 && (
        <div className='flex items-center justify-center mt-6 space-x-2'>
          <button
            className='flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            onClick={handlePrevious}
            aria-label='Previous page'
          >
            &lt;
          </button>

          <div className='flex items-center space-x-1'>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded-full ${
                  currentPage === index
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => setCurrentPage(index)}
                aria-label={`Page ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            className='flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            onClick={handleNext}
            aria-label='Next page'
          >
            &gt;
          </button>
        </div>
      )} */}

      <div className='flex items-center justify-center mt-6 space-x-2'>
        <button
          className='flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          onClick={handlePrevious}
          aria-label='Previous page'
        >
          &lt;
        </button>

        <div className='flex items-center space-x-1'>
          {Array.from({ length: totalPages }).map((_, index) => {
            const showPage =
              index < 5 ||
              index === totalPages - 1 ||
              index === currentPage;

            const isEllipsis =
              index === 5 &&
              totalPages > 6 &&
              currentPage < totalPages - 2;

            if (isEllipsis) {
              return (
                <span
                  key='ellipsis'
                  className='px-2 text-gray-400 select-none'
                >
                  ...
                </span>
              );
            }

            if (showPage) {
              return (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full ${
                    currentPage === index
                      ? "bg-gray-200 dark:bg-gray-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setCurrentPage(index)}
                  aria-label={`Page ${index + 1}`}
                >
                  {index + 1}
                </button>
              );
            }

            return null;
          })}
        </div>

        <button
          className='flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          onClick={handleNext}
          aria-label='Next page'
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

function TributeCard({ tribute }: { tribute: Tribute }) {
  return (
    <div className='h-full p-6 overflow-hidden transition-all duration-300 border border-gray-200 rounded-lg hover:shadow-md dark:border-gray-700'>
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
        {tribute.date && (
          <span className='mt-2 text-xs text-gray-400 dark:text-gray-500'>
            {new Date(tribute.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        )}
      </div>
    </div>
  );
}
