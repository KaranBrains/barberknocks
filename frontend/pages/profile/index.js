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
                <a class="nav-link pl-3" style={{ marginLeft: "20px", fontSize:'20px' }}>
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
              <div className="bg-tertiaryColor h-100 py-5 px-3">
                <form>
                  <div className="input-group font-medium">
                    <input
                      required
                      name="Name"
                      type="text"
                      value={user?.fullName}
                      className="form-control"
                      placeholder="Full Name"
                      disabled
                    />
                  </div>
                  <div className="d-flex">
                    <div
                      className="input-group mt-4 font-medium"
                      style={{ marginRight: "20px" }}
                    >
                      <input
                        required
                        name="email"
                        type="text"
                        value={user?.email}
                        className="form-control w-50"
                        placeholder="Email"
                        disabled
                      />
                    </div>
                    <div className="input-group mt-4 ml-3 font-medium">
                      <input
                        required
                        name="phone no"
                        type="text"
                        value={"+" + user?.phone}
                        className="form-control w-50"
                        placeholder="Contact Number"
                        disabled
                      />
                    </div>
                  </div>
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
