import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import Homepage from "./components/Homepage";
import Users from "./components/Users";
import Posts from "./components/Posts";

function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-8 py-4">
          <Link
            to="/"
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              location.pathname === "/"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Homepage
          </Link>
          <Link
            to="/users"
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              location.pathname === "/users"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Users
          </Link>
          <Link
            to="/posts"
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              location.pathname === "/posts"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Posts
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
