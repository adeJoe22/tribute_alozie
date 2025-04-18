import { Link } from "react-router-dom";
import TributeCarousel from "../components/TributeCarousel";
import type { Tribute } from "../lib/types";

interface TributesPageProps {
  tributes: Tribute[];
  loading: boolean;
}

export default function TributesPage({
  tributes,
  loading,
}: TributesPageProps) {
  return (
    <main className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='container px-4 py-8 mx-auto max-w-5xl'>
        <div className='flex items-center justify-between mb-8'>
          <Link
            to='/'
            className='flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 mr-2'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </svg>
            Back to Home
          </Link>
        </div>

        <div className='mb-12 text-center'>
          <h1 className='mb-6 text-3xl font-bold text-gray-800 dark:text-gray-100'>
            Tributes for Deaconess Anna Alozie
          </h1>
          <p className='max-w-2xl mx-auto mb-8 text-gray-600 dark:text-gray-300'>
            Memories and messages shared by family and friends.
          </p>
        </div>

        <div className='mb-12'>
          {loading ? (
            <div className='p-8 text-center border rounded-lg shadow-sm'>
              <p className='text-gray-500 dark:text-gray-400'>
                Loading tributes...
              </p>
            </div>
          ) : tributes.length > 0 ? (
            <TributeCarousel tributes={tributes} />
          ) : (
            <div className='p-8 text-center border rounded-lg shadow-sm'>
              <p className='text-gray-500 dark:text-gray-400'>
                No tributes yet. Be the first to share your memories.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
