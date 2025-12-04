import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AnimeDetailsPage from "./pages/AnimeDetailsPage";
import MyCollectionPage from "./pages/MyCollectionPage";
import AddToCollectionPage from "./pages/AddToCollectionPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                🎌 Anime Tracker
              </Link>
              <div className="flex gap-6">
                <Link to="/" className="text-gray-600 hover:text-gray-900">
                  Browse
                </Link>
                <Link to="/add" className="text-gray-600 hover:text-gray-900">
                  Add Anime
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/anime/:animeId" element={<AnimeDetailsPage />} />
          <Route path="/collection/:userId" element={<MyCollectionPage />} />
          <Route path="/add" element={<AddToCollectionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
