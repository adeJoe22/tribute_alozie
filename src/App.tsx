"use client";

import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import TributesPage from "./pages/TributesPage";
import type { Tribute } from "./lib/types";

function App() {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTributes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/tributes",
        );
        const data = await response.json();
        setTributes(data);
      } catch (error) {
        console.error("Failed to fetch tributes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTributes();
  }, []);

  const handleAddTribute = (newTribute: Tribute) => {
    setTributes((prev) => [...prev, newTribute]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <HomePage
              tributes={tributes}
              loading={loading}
              onAddTribute={handleAddTribute}
            />
          }
        />
        <Route
          path='/tributes'
          element={
            <TributesPage tributes={tributes} loading={loading} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
