import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user: userInfo, logout } = useAuth();

  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [profileMenuRef]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  const logoutHandler = () => {
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
    logout();
    navigate("/login");
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const isAdminUser = userInfo && (
    userInfo.email === "sofinmansuri0@gmail.com" ||
    userInfo.isAdmin === true
  );

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled
      ? "bg-white shadow-md py-3"
      : "bg-white py-4"
      }`}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={handleLinkClick}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              AI Resume Analyzer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'} transition-colors`}>
              Home
            </NavLink>
            <NavLink to="/job-roles" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'} transition-colors`}>
              Job Roles
            </NavLink>
            {userInfo && (
              <>
                <NavLink to="/analyze" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'} transition-colors`}>
                  Analyze
                </NavLink>
                <NavLink to="/customize" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'} transition-colors`}>
                  Customize
                </NavLink>
              </>
            )}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center gap-4">
            {userInfo ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <span className="text-sm font-medium text-gray-900">{userInfo.name}</span>
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                    {userInfo.name.charAt(0).toUpperCase()}
                  </div>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <Link
                      to="/profile"
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Profile
                    </Link>
                    {isAdminUser && (
                      <Link
                        to="/admin"
                        onClick={handleLinkClick}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={logoutHandler}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={handleLinkClick}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={handleLinkClick}
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-gray-900 transform transition ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-full bg-gray-900 transition ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 w-full bg-gray-900 transform transition ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-6 py-4 space-y-2">
            {userInfo ? (
              <>
                <div className="pb-3 mb-3 border-b border-gray-200">
                  <div className="font-medium text-gray-900">{userInfo.name}</div>
                  <div className="text-sm text-gray-500">{userInfo.email}</div>
                </div>
                <Link to="/analyze" onClick={handleLinkClick} className="block py-2 text-gray-700">Analyze</Link>
                <Link to="/customize" onClick={handleLinkClick} className="block py-2 text-gray-700">Customize</Link>
                <Link to="/job-roles" onClick={handleLinkClick} className="block py-2 text-gray-700">Job Roles</Link>
                <Link to="/profile" onClick={handleLinkClick} className="block py-2 text-gray-700">Profile</Link>
                {isAdminUser && (
                  <Link to="/admin" onClick={handleLinkClick} className="block py-2 text-gray-700">Admin</Link>
                )}
                <button onClick={logoutHandler} className="block w-full text-left py-2 text-red-600">Logout</button>
              </>
            ) : (
              <>
                <Link to="/" onClick={handleLinkClick} className="block py-2 text-gray-700">Home</Link>
                <Link to="/job-roles" onClick={handleLinkClick} className="block py-2 text-gray-700">Job Roles</Link>
                {/* <Link to="/analyze" onClick={handleLinkClick} className="block py-2 text-gray-700">Pricing</Link> */}
                <Link to="/login" onClick={handleLinkClick} className="block py-2 text-gray-700">Login</Link>
                <Link to="/register" onClick={handleLinkClick} className="block py-2 bg-blue-600 text-white text-center rounded-lg font-semibold">Sign Up Free</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;