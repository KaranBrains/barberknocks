import { useState } from "react";
import Link from "next/link";
import styles from "../../../styles/Form.module.css";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { signUp } from "../../../redux/actions/auth";

function Signup() {
  const initialState = {
    fullName: "",
    email: "",
    password: "",
    phone: "",
    dialcode: "1",
  };
  const [formData, setformData] = useState(initialState);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.phone = formData.dialcode + formData.phone;
    dispatch(signUp(formData, router))
    .then(()=>{
    setformData(initialState);
    });
    localStorage.setItem("userProfile", JSON.stringify(formData));
  };

  return (
    <div className="auth-bg">
      <div className="container my-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-12 col-12">
            <div className="card shadow px-lg-5 py-5 px-3 bg-white">
              <h1 className="text-center font-bold text-primaryColor mb-4">
                Welcome to Road-Rules, Signup here...
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mt-4">
                  <label className="font-demi text-primaryColor">
                    Full Name
                  </label>
                  <input
                    value={formData.fullName}
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                    name="fullName"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mt-4">
                  <label className="font-demi text-primaryColor">Email</label>
                  <input
                    value={formData.email}
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                    name="email"
                    type="email"
                    className="form-control"
                  />
                </div>
                <div className="mt-4">
                  <label className="font-demi text-primaryColor">
                    Phone Number
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <select
                        name="dialcode"
                        className={`${styles.formDropdown}`}
                        value={formData.dialcode}
                        onChange={(e) => {
                          setformData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      >
                        <option value="1" selected>
                          +1
                        </option>
                        <option value="91">+91</option>
                        <option value="221">+221</option>
                      </select>
                    </div>
                    <input
                      value={formData.phone}
                      onChange={(e) => {
                        setformData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      required
                      name="phone"
                      type="text"
                      className="form-control mt-1"
                      style={{ borderRadius: "0px 10px 10px 0px" }}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="font-demi text-primaryColor">
                    Password
                  </label>
                  <input
                    value={formData.password}
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                    name="password"
                    type="password"
                    className="form-control"
                  />
                </div>
                <div className="text-center mt-5 mb-3">
                  <button
                    className="text-white bg-secondaryColor font-demi btn-blue w-100 submit-button"
                    type="submit"
                  >
                    Signup
                  </button>
                </div>
              </form>
            </div>
            <Link href="/auth/login">
              <div
                className={`font-demi text-primaryColor text-center mt-4 py-3 px-3 bg-white ${styles.greyHover}`}
              >
                Already a member?{" "}
                <span className="ml-2 text-secondaryColor">Signin</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
