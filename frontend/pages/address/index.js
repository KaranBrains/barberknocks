import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { getUserByEmail } from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';

function Address() {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.main?.authData?.user);
  useEffect(() => {
    dispatch(getUserByEmail());
  }, []);
  console.log("abc");
  console.log(user?.address);
  const router = useRouter();
  const handleChange = () => {
    router.push("/add-new-address/address");
  };
  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="col-lg-2 col-md-3 hidden-mobile-sidebar">
          <div>
            <ul class="navbar-nav flex-column">
              <li class="nav-item heading-hover-main">
                <a
                  class="nav-link pl-3"
                  style={{ marginLeft: "20px", fontSize: "20px" ,marginRight: '50px'}}
                >
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
        <div className="container">
          <h1 className="text-primaryColor font-bold text-center mt-3">
            Add Address{" "}
            <button onClick={handleChange} className="btn">
              <div className="text-primaryColor bg-white">
                <AddIcon className="icon-add"/>
              </div>
            </button>
          </h1>
          <div className="row my-5 d-flex justify-content-center">
            <div className="col-lg-9 col-md-8 col-sm-12 col-12">
              <form>
                  
                {user ? user?.address.map((add) => (
                  <>
                    <div className="bg-white h-100 py-3 px-3 mb-4 shadow">
                    <div className="w-100 font-medium mt-3">
                        <div
                          required
                          name="Name"
                          type="text"
                          className="bg-tertiaryColor rounded border px-3 py-2"
                        >
                          {add?.street}
                        </div>
                      </div>
                      <div className="w-100 font-medium mt-3">
                        <div
                          required
                          name="Name"
                          type="text"
                          className="bg-tertiaryColor rounded border px-3 py-2"
                        >
                          {add?.city}
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="w-100 font-medium mt-3 w-50">
                          <div
                            required
                            name="Name"
                            type="text"
                            className="bg-tertiaryColor rounded border px-3 py-2"
                          >
                            {add?.postalCode}
                          </div>
                        </div>
                      </div>

                      <div className="w-100 font-medium mt-3">
                        <div
                          required
                          name="Name"
                          type="text"
                          className="bg-tertiaryColor rounded border px-3 py-2"
                        >
                          {add?.province}
                        </div>
                      </div>
                    </div>
                  </>
                )): 'No address'}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;
