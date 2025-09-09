import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to Crud website
        </h1>
        <p className="text-lg text-gray-600 mb-2">Manage users and posts</p>
        <p className="text-base text-gray-500 mb-12">
          Navigate to the user or posts sections to get started
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link
            to="/users"
            className="group bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Manage Users
              </h3>
              <p className="text-gray-600">View and edit user profiles</p>
            </div>
          </Link>

          <Link
            to="/posts"
            className="group bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Manage Posts
              </h3>
              <p className="text-gray-600">Create and moderate content</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
