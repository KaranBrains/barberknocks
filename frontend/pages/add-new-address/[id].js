import { useState } from "react";
import Link from "next/link";
import styles from "../../styles/Form.module.css";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { addAddress } from "../../redux/actions/auth";

function Signup() {
  const initialState = {
    city: "Torronto",
    province: "",
    street: "",
    postalCode: "",
  };
  const [formData, setformData] = useState(initialState);
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAddress(formData,id,router));
  };

  return (
    <div className="auth-bg">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-12 col-12">
            <div className="card shadow px-lg-5 py-5 px-3 bg-white mt-5">
              <h1 className="text-center font-bold text-primaryColor mb-4">
                Add Pickup Address
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mt-4">
                  <label className="font-demi text-primaryColor mb-2">
                    City
                  </label>
                  <input
                    value={formData.city}
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                    name="city"
                    type="text"
                    className="form-control"
                  >
                    </input>
                    <label className="font-demi mb-2 font-8">
                    *Surrey, Richmond, Langley, Delta, White Rock, Coquitlam, New Westminster, Vancouver, Burnaby
                  </label>
                </div>
                <div className="mt-4">
                  <label className="font-demi text-primaryColor mb-2">Province</label>
                  <input
                    value={formData.province}
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                    name="province"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mt-4">
                  <label className="font-demi text-primaryColor mb-2">Street Address</label>
                  <input
                    value={formData.street}
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                    name="street"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mt-4">
                  <label className="font-demi text-primaryColor mb-2">
                  Postal Code
                  </label>
                  <input
                    value={formData.postalCode}
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    required
                    name="postalCode"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="text-center mt-5 mb-3">
                  <button
                    className="text-white bg-secondaryColor font-demi btn-blue w-100 submit-button"
                    type="submit"
                  >
                    Add
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

export default Signup;
