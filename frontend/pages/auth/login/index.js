import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { signIn } from "../../../redux/actions/auth";
import styles from "../../../styles/Form.module.css";

function Login() {
  const initialState = { email: "", password: "" };
  const [formData, setformData] = useState(initialState);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(formData, router));
    setformData(initialState);
  };

  return (
    <div className="auth-bg">
      <div className="container my-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-12 col-12">
            <div className="card shadow px-3 px-lg-5 py-5 bg-white">
              <h1 className="text-center font-bold text-primaryColor mb-4">
                Sign in to your account
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mt-4">
                  <label className="font-demi text-primaryColor">Email</label>
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
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mt-4">
                  <div className="d-flex justify-content-between">
                    <label className="font-demi text-primaryColor">
                      Password
                    </label>
                    <Link href="/auth/forgot/email">
                      <p className={`text-secondaryColor font-demi`}>
                        Forgot Password?
                      </p>
                    </Link>
                  </div>

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
                    className="text-white bg-secondaryColor font-demi btn-blue w-100 submit-button"
                    type="submit"
                  >
                    Signin
                  </button>
                </div>
              </form>
            </div>
            <Link href="/auth/signup">
              <div
                className={`font-demi text-primaryColor mt-4 py-3 px-3 text-center bg-white ${styles.greyHover}`}
              >
                Become a member{" "}
                <span className="ml-2 text-secondaryColor">Signup</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
