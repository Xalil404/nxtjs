// components/Header.js
import 'bootstrap/dist/css/bootstrap.min.css';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react"; // Import useState and useEffect

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the authToken in localStorage once the component mounts
    const authToken = localStorage.getItem('authToken');
    setIsAuthenticated(!!authToken); // If authToken exists, the user is authenticated
  }, []);
  
  return (
    <div className="navcolor">
      <nav className="navbar navbar-expand-lg navbar-light py-3 sticky-top">
        <div className="container-fluid">
          {/* Logo (Top Left) */}
          <Link className="navbar-brand ms-5 order-2 order-lg-1" href="/">
            <Image
              src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1734872641/Screenshot_2024-12-22_at_1.03.09_PM-removebg-preview_wg8rtk.png"
              alt="Logo"
              className="logo-image"
              width={200}
              height={50}
            />
          </Link>

          {/* Navbar Links (Top Left) */}
          <div className="collapse navbar-collapse order-3 order-lg-2" id="navbarText">
            <ul className="navbar-nav mb-2 mb-lg-0 me-auto">
              {isAuthenticated && (
                <>
                  <li className="nav-item mx-2">
                    <Link className="nav-link-nav active text-dark" href="/dashboard" style={{ textDecoration: 'none'}}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link className="nav-link-nav active text-dark" href="/logout" style={{ textDecoration: 'none'}}>
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Sign In and Sign Up Buttons (Top Right) */}
          <div className="d-flex order-2 order-lg-3 align-items-center gap-3">
            {!isAuthenticated && (
              <>
                <Link className="nav-link-a d-none d-lg-block text-dark" href="/login" style={{ textDecoration: 'none' }}>
                  Sign in
                </Link>

                <Link
                  className="nav-link btn btn-sm rounded-pill px-4"
                  style={{
                    backgroundColor: "#E8BF73",
                    color: "black",
                    padding: "10px 20px",
                    marginRight: "10px",
                    marginLeft: "5px",
                  }}
                  href="/register"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
