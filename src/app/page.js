import Header from "../components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import styles from "./page.module.css";



export default function Home() {
  return (
    <div className={styles.page}>
      {/* Render the Header component */}
      <Header />

      {/* Landing Page */}
      <div className="container mt-5">
        {/* Section 1: Left Column for Text and Button */}
        <div className="row">
          <div className="col-md-6 d-flex align-items-center">
            <div className="content-wrapper px-5">
              <h1 className="display-4 mb-4 fw-bold">Lorem ipsum dolor sit amet</h1>
              <h5 className="mb-4">
                Sed accumsan sit amet magna fringilla accumsan. Sed accumsan sit amet magna fringilla accumsan.
              </h5>
              <div className="text-center">
                {/* Conditional rendering based on user authentication status */}
                {typeof window !== 'undefined' && localStorage.getItem('authToken') ? (
                  <Link href="/dashboard" legacyBehavior>
                    <a className="btn btn-lg mt-5 rounded-pill px-5" style={{ backgroundColor: '#E8BF73', color: 'black' }}>
                      Go to Dashboard
                    </a>
                  </Link>
                ) : (
                  <Link href="/register" legacyBehavior>
                    <a className="btn btn-lg mt-5 rounded-pill px-5" style={{ backgroundColor: '#E8BF73', color: 'black' }}>
                      Get Started
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Section 1: Right Column for Image */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1732203242/a_uc4bwg.png"
              className="img-fluid"
              alt="Web Talent"
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1732204366/Group_32932_uditd0.png"
              className="img-fluid"
              alt="Web Talent"
            />
          </div>

          <div className="col-md-6 d-flex align-items-center">
            <div className="content-wrapper px-5">
              <h1 className="display-4 mb-4 fw-bold">Lorem ipsum dolor sit amet</h1>
              <h5 className="mb-4">
                Sed accumsan sit amet magna fringilla accumsan. Sed accumsan sit amet magna fringilla accumsan.
              </h5>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="row justify-content-center mt-5">
          <div className="col-md-6 text-center">
            <img
              src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1732204577/Frame_cvygfc.png"
              className="img-fluid"
              alt="Web Talent"
            />
            <h1 className="display-4 mb-4 fw-bold mt-4">Lorem ipsum dolor sit amet</h1>
          </div>
        </div>

        {/* Section 4 */}
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="content-wrapper px-5">
              <h1 className="display-4 mb-4 fw-bold">Lorem ipsum dolor sit amet</h1>
              <h5 className="mb-4">
                Sed accumsan sit amet magna fringilla accumsan. Sed accumsan sit amet magna fringilla accumsan..
              </h5>
            </div>
          </div>

          <div className="col-md-6 d-flex justify-content-center">
            <img
              src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1732110035/Group_32910_oyrnu7.png"
              className="img-fluid"
              alt="Web Talent"
            />
          </div>
        </div>

        {/* Section 5 - Get mobile app */}
        <div className="container-fluid p-0 text-center">
          <h1 className="display-5 fw-bold mb-5">Get the mobile apps for iPhone & Android</h1>

          {/* Full-Width Image */}
          <div className="row">
            <div className="col-12">
              <img
                src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1732204679/Screenshot_2024-11-21_at_3.57.44_PM_tz65ur.png"
                className="img-fluid w-100"
                alt="Full Width"
              />
            </div>
          </div>

          {/* Mobile apps buttons */}
          <div className="row justify-content-center">
            <div className="col-12 col-md-3 mt-4">
              <div className="my-5 d-flex justify-content-center">
                <a href="https://apps.apple.com/us/app/dates-reminders-app/id123456789" target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/white/en-us?size=250x83&releaseDate=1314144000&h=91ef6f52d049d3387a50498048775082"
                    alt="Download on the App Store"
                    style={{ width: '200px' }}
                  />
                </a>
              </div>
            </div>
            <div className="col-12 col-md-3 mt-4">
              <div className="my-5 d-flex justify-content-center">
                <a href="https://play.google.com/store/apps/details?id=com.example.datesreminder" target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://developer.android.com/images/brand/en_generic_rgb_wo_45.png"
                    alt="Get it on Google Play"
                    style={{ width: '200px' }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-auto d-flex flex-wrap justify-content-between align-items-center py-3 my-4">
          <Link href="/" legacyBehavior>
            <a className="footer">
              <img
                src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1734872641/Screenshot_2024-12-22_at_1.03.09_PM-removebg-preview_wg8rtk.png"
                alt="Logo"
                className="logo-image"
                style={{ width: '200px' }}
              />
            </a>
          </Link>
          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item px-2">
              <Link href="/contact" legacyBehavior>
                <a className="nav-link px-2 text-dark">Contact</a>
              </Link>
            </li>
            <li className="nav-item px-2">
              <a
                href="https://www.termsfeed.com/live/1fd2ca25-0553-48c4-97d8-308e55709144"
                className="nav-link px-2 text-dark"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms
              </a>
            </li>
            <li className="nav-item px-2">
              <a
                href="https://www.termsfeed.com/live/ba80401d-3f01-4082-96ce-a0196d9cd3ac"
                className="nav-link px-2 text-dark"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
