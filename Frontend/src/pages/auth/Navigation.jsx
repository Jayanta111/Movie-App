import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineUser,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/user";
import { useLogoutMutation } from "../../redux/api/user";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      console.log("Logging out..."); // Debugging: Check if function runs
      await logoutApiCall().unwrap();
      
      dispatch(logout());
      
      // Clear local storage and refresh to reset state
      localStorage.clear();
      sessionStorage.clear();
      
      navigate("/login");
      window.location.reload(); // Ensure complete re-render
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  

  return (
    <div className="fixed top-10 left-[30rem] transform translate-x-1/2 translate-y-1/2 z-50 bg-[#0f0f0f] border w-[30%] px-[4rem] mb-[2rem] rounded-lg shadow-lg">
      <section className="flex justify-between items-center">
        {/* Left Section - Navigation Links */}
        <div className="flex justify-center items-center mb-[2rem]">
          <Link to="/" className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineHome className="mr-2 mt-[3rem] text-white" size={26} />
            <span className="hidden nav-item-name mt-[3rem] text-white">Home</span>
          </Link>

          <Link
            to="/movies"
            className="flex items-center transition-transform transform hover:translate-x-2 ml-[1rem]"
          >
            <MdOutlineLocalMovies className="mr-2 mt-[3rem] text-white" size={26} />
            <span className="hidden nav-item-name mt-[3rem] text-white">Movies</span>
          </Link>
        </div>

        {/* Right Section - Profile Dropdown */}
        <div className="relative">
          {userInfo ? (
            <>
              <button
                onClick={toggleDropdown}
                className="text-gray-800 focus:outline-none flex items-center space-x-2"
              >
                <AiOutlineUser className="text-white" size={26} />
                <span className="text-white">{userInfo.username}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  } text-white`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                  />
                </svg>
              </button>

              {dropdownOpen && (
  <ul className="absolute right-0 mt-3 w-[12rem] bg-white text-gray-600 shadow-lg rounded-lg py-2 transition-opacity duration-200 opacity-100 z-50 overflow-hidden max-w-xs">
    <li>
      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
        Profile
      </Link>
    </li>
    <li>
      <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
        Settings
      </Link>
    </li>

    {userInfo.isAdmin && (
      <li>
        <Link to="/admin/movies/genre" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
          Admin Dashboard
        </Link>
      </li>
    )}
  {userInfo.isAdmin && (
      <li>
        <Link to="/admin/movies/create-movie" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
        Create Movie
        </Link>
      </li>
    )}
    <hr className="my-2 border-gray-300" />

    <li>
      <button onClick={logoutHandler} className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600 font-semibold transition-colors">
        Logout
      </button>
    </li>
  </ul>
)}

            </>
          ) : (
            <ul className="flex">
              <li>
                <Link
                  to="/login"
                  className="flex items-center mt-5 transition-transform transform hover:translate-x-2 mb-[2rem]"
                >
                  <AiOutlineLogin className="mr-2 mt-[4px] text-white" size={26} />
                  <span className="hidden nav-item-name text-white">LOGIN</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center mt-5 transition-transform transform hover:translate-x-2 ml-[1rem]"
                >
                  <AiOutlineUserAdd className="text-white" size={26} />
                  <span className="hidden nav-item-name text-white">REGISTER</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Navigation;
