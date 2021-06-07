import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { changePassword } from "../../../../redux/actions/auth";

function ForgotPassword() {
  const initialState = { password: "" };
  const [formData, setformData] = useState(initialState);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePassword(formData.password, router));
    setformData(initialState);
  };

  return (
    <div className="auth-bg">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-12 col-12">
            <div className="card shadow px-2 px-lg-5 py-5 bg-white mt-5">
              <h1 className="text-center font-bold text-primaryColor mb-4">
                Enter the New Password
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mt-4">
                  <label className="text-primaryColor font-demi">
                    Password
                  </label>
                  <input
                    required
                    value={formData.password}
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    name="password"
                    type="password"
                    className="form-control"
                  />
                </div>
                <div className="text-center mt-5 mb-3">
                  <button
                    className="text-white bg-secondaryColor font-demi w-100 btn-blue submit-button"
                    type="submit"
                  >
                    Submit
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

export default ForgotPassword;
