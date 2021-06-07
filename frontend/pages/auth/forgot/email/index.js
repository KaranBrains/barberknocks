import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { forgotEmailOtp } from "../../../../redux/actions/auth";

function Forgot() {
  const initialState = { email: "" };
  const [formData, setformData] = useState(initialState);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotEmailOtp(formData, router));
    setformData(initialState);
  };

  return (
    <div className="auth-bg">
      <div className="container my-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-12 col-12">
            <div className="card shadow px-2 px-lg-5 py-5 bg-white">
              <h1 className="text-center font-bold text-primaryColor mb-4">
                Enter the E-mail associated with your account
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="input-group mt-4">
                  <input
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="text-center mt-5">
                  <button
                    className="text-white bg-secondaryColor font-demi btn-blue submit-button"
                    type="submit"
                  >
                    Send OTP
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
