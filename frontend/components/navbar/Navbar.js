import { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../redux/constants";
import SettingsIcon from '@material-ui/icons/Settings';
import ClassIcon from '@material-ui/icons/Class';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


function NavbarComponent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: LOGOUT });
    router.push("/");
  };
  const [isLoggedIn, setisLoggedIn] = useState(null);
  useEffect(() => {
    setisLoggedIn(localStorage.getItem("token"));
  }, [isLoggedIn]);
  return (
    <div className="bg-image">
      <Navbar
        expand="lg"
        className="nav-background navbar align-items-center pt-3 pl-5"
        sticky="top"
        collapseOnSelect={true}
        variant="light"
      >
        <Navbar.Brand href="/home" className="font-demi ml-5">
          {/* <img
            src="/images/logo-roadrules.svg"
            alt="logo"
            className={`img-fluid py-0 my-0 ${styles.logo}`}
          /> */}
          BarberKnocks
        </Navbar.Brand>
        <Navbar.Toggle className="toggle-icon" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`${styles.mlAuto}`}>
            <Nav.Link
              href="/serviceLocation"
              className="font-demi font-17 px-3 navbar-item
                 text-center"
            >
              Services
            </Nav.Link>
            <Nav.Link
              href="/about"
              className="font-demi font-17 px-3 navbar-item
                 text-center"
            >
              FAQ’s
            </Nav.Link>
            <Nav.Link
              href="/contact"
              className="font-demi font-17
                  px-3 navbar-item  text-center"
            >
              Contact Us 
            </Nav.Link>
            <Nav.Link
              href="/about"
              className="font-demi font-17
                  px-3 navbar-item  text-center"
            >
              About Us
            </Nav.Link>
            <Nav.Link
              href="/serviceLocation"
              className="font-demi font-17
                  px-3 navbar-item  text-center"
            >
              <button className="btn btn-dark black-button">Book Now</button>
            </Nav.Link>
            {!isLoggedIn ? (
              <Nav.Link
              href="/auth/login"
              className="font-demi font-17
                  px-3 navbar-item  text-center navbar-desktop-hidden"
            >
              Login/Signup
            </Nav.Link>
            ) : (
              <Nav.Link
              href="/profile"
              className="font-demi font-17
                  px-3 navbar-item  text-center navbar-desktop-hidden"
            >
              User Profile
            </Nav.Link>
            )}
          {isLoggedIn ? (
            <Nav.Link
              href="/address"
              className="font-demi font-17
                  px-3 navbar-item  text-center navbar-desktop-hidden"
            >
            Addresses
          </Nav.Link>
            ) : ''}
            {isLoggedIn ? (
            <Nav.Link
              href="/myBookings"
              className="font-demi font-17
                  px-3 navbar-item  text-center navbar-desktop-hidden"
            >
            My Bookings
          </Nav.Link>
            ) : ''}
          {isLoggedIn ? (
            <Nav.Link
              className="font-demi font-17
                  px-3 navbar-item text-white bg-secondaryColor text-center navbar-desktop-hidden"
                  onClick={logout}
            >
            Logout
          </Nav.Link>
            ) : '' }
            <hr className="navbar-desktop-hidden"></hr>
            {isLoggedIn != null ? (
              <NavDropdown
                eventKey={1}
                className="navbar-hidden"
                title={
                  <div className="pull-left text-center">
                    <img
                      className="thumbnail-image text-center"
                      src="/images/profile_avatar.png"
                      alt="user pic"
                      width="30"
                      height="30"
                      alt=""
                      style={{ borderRadius: "50%" , marginRight: "60px !important"}}
                    />
                  </div>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  <Link href="/profile">
                    <div className="font-demi ">
                      <SettingsIcon />
                      &nbsp;User Profile
                    </div>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link href="/myBookings">
                    <div className="font-demi ">
                      <ClassIcon />
                      &nbsp;My Bookings
                    </div>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <div className="font-demi " onClick={logout}>
                    <ExitToAppIcon />
                    &nbsp;&nbsp;Logout
                  </div>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                className="navbar-hidden"
                title={
                  <div className="pull-left">
                    <img
                      className="thumbnail-image"
                      src="/images/profile_avatar.png"
                      alt="user pic"
                      width="30"
                      height="30"
                      alt=""
                      style={{ borderRadius: "50%", marginRight: "60px !important" }}
                    />
                  </div>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  <Link href="/auth/login">
                    <div className="">
                      <i className="fas fa-sign-in-alt mr-2"></i>
                      &nbsp;Login
                    </div>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link href="/auth/signup">
                    <div className="">
                      <i className="fas fa-user-circle mr-2"></i>
                      &nbsp;Signup
                    </div>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
