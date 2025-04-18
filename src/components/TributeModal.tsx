"use client";

import type React from "react";

import { useState } from "react";
import type { Tribute } from "../lib/types";

interface TributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTribute: (tribute: Tribute) => void;
}

export default function TributeModal({
  isOpen,
  onClose,
  onAddTribute,
}: TributeModalProps) {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !relationship || !message) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/tributes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            relationship,
            message,
            date: new Date().toISOString(),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to submit tribute");
      }

      const newTribute = await response.json();
      onAddTribute(newTribute);

      // Reset form
      setName("");
      setRelationship("");
      setMessage("");
      onClose();
    } catch (err) {
      console.error("Error submitting tribute:", err);
      setError("Failed to submit tribute. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>
            Share Your Tribute
          </h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className='grid gap-4'>
          {error && (
            <div className='p-3 text-sm text-red-500 bg-red-50 rounded-md dark:bg-red-900/20'>
              {error}
            </div>
          )}

          <div className='grid gap-2'>
            <label
              htmlFor='name'
              className='text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Your Name
            </label>
            <input
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your name'
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600'
            />
          </div>

          <div className='grid gap-2'>
            <label
              htmlFor='relationship'
              className='text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Relationship
            </label>
            <input
              id='relationship'
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder='How did you know them?'
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600'
            />
          </div>

          <div className='grid gap-2'>
            <label
              htmlFor='message'
              className='text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Your Tribute
            </label>
            <textarea
              id='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='Share your memories and thoughts...'
              rows={5}
              className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600'
            />
          </div>

          <div className='flex justify-end gap-2 mt-4'>
            <button
              type='button'
              onClick={onClose}
              disabled={isSubmitting}
              className='px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500'
            >
              {isSubmitting ? "Submitting..." : "Submit Tribute"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
