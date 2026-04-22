import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      
      <div className="text-center">
        
        {/* 404 */}
        <h1 className="text-8xl font-extrabold text-gray-800 mb-4">404</h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-6">
         Not Found Page Try Again😢
        </p>

        {/* Button */}
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Home Page
        </Link>
      </div>
    </div>
  );
}