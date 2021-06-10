import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail } from "../../redux/actions/auth";
import Link from "next/link";
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';

function UserProfile() {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.main?.authData?.user);
  useEffect(() => {
    dispatch(getUserByEmail());
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="col-lg-2 col-md-3 hidden-mobile-sidebar">
          <div>
            <ul class="navbar-nav flex-column">
              <li class="nav-item heading-hover-main">
                <a class="nav-link pl-3" style={{ marginLeft: "20px", fontSize:'20px' ,marginRight: '100px'}}>
                  <span className="font-bold main-heading-hover text-primaryColor">
                    <SettingsIcon /> Settings
                  </span>
                  <hr className="white-hr"></hr>
                </a>
              </li>
              <div
                className="font-demi text-primaryColor"
                style={{ marginLeft: "20px" }}
              >
                <Link href="/profile" className="hoverable">
                  <div className=" py-2 px-3 hoverable">
                    <AccountBoxIcon /> &nbsp;User Profile
                  </div>
                </Link>
                <br />
                <Link href="/address" className="hoverable">
                  <div className=" py-2 px-3 hoverable">
                    <HomeIcon /> &nbsp;Address
                  </div>
                </Link>
              </div>
            </ul>
          </div>
        </div>
        <div className="container mb-5 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="row mt-5 d-flex justify-content-center">
            <div className="col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card shadow profile-shadow px-3 px-lg-5 py-5 bg-white">
              <h1 className="text-center font-bold text-primaryColor mb-4">
                User Profile
              </h1>
              <form>
                <div className="mt-4">
                  <label className="font-demi text-primaryColor">Name</label>
                  <input
                    required
                    value={user?.fullName}
                    name="email"
                    type="text"
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="mt-4">
                  <label className="font-demi text-primaryColor">Email</label>
                  <input
                    required
                    value={user?.email}
                    name="email"
                    type="text"
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="mt-4">
                  <label className="font-demi text-primaryColor">Phone</label>
                  <input
                    required
                    value={user?.phone}
                    name="email"
                    type="text"
                    className="form-control"
                    disabled
                  />
                </div>
                {/* <div className="text-center mt-5 mb-3">
                  <button
                    className="text-white bg-secondaryColor font-demi btn-blue w-100 submit-button"
                    type="submit"
                  >
                    Edit
                  </button>
                </div> */}
              </form>
            </div>
            </div>
           </div> 
        </div>
      </div>
    </>
  );
}

export default UserProfile;
