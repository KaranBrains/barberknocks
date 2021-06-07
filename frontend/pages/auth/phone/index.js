import { useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { phoneOtp, verifyPhoneOtp } from "../../../redux/actions/auth";
import { Stepper } from "react-form-stepper";
import styles from "../../../styles/Form.module.css";
import swal from "sweetalert";

function Phone() {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp) {
      dispatch(verifyPhoneOtp(otp, router));
    } else {
      swal({
        text: "Please enter otp",
        icon: "info",
      });
    }
  };
  const handleChange = (otp) => {
    setOtp(otp);
  };

  const resendOtp = (e) => {
    e.preventDefault();
    dispatch(phoneOtp());
  };

  return (
    <>
      <div className="container my-5">
        <div className="row d-flex justify-content-center mb-4">
          <div className="col-lg-10 col-sm-12 col-md-12 col-12 mb-4 font-regular px-0">
            <Stepper
              steps={[
                { label: "Step 1" },
                { label: "Step 2" },              
              ]}
              connectorStateColors={true}
              className="text-primaryColor"
              connectorStyleConfig={{
                activeColor: "#1e4c6b",
                completedColor: "#1e4c6b",
                disabledColor: "#bdbdbd",
                size: 1,
                stepSize: "0em",
              }}
              styleConfig={{
                activeBgColor: "#00AFF5",
                completedBgColor: "#1e4c6b",
                labelFontSize: "1rem",
                circleFontSize: "1rem",
                size: "3em",
                fontWeight: 900,
              }}
              activeStep={1}
            />
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 col-md-8 col-sm-12 col-12">
            <div className="card">
              <h1 className="text-center font-bold text-primaryColor mb-4">
                Please enter the OTP received on your number.
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center">
                  <OtpInput
                    value={otp}
                    numInputs={6}
                    isInputNum={true}
                    onChange={handleChange}
                    separator={<span>&nbsp;&nbsp;</span>}
                    inputStyle={{
                      margin: "5px",
                      height: "3rem",
                      width: "3rem",
                      backgrounColor: "#fffff",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
                    }}
                    focusStyle={{
                      outline: "none",
                    }}
                  />
                </div>
                <div className="text-center mt-3">
                  <button
                    className="text-white bg-secondaryColor font-demi btn-blue submit-button"
                    type="submit"
                  >
                    Continue
                  </button>
                </div>
              </form>
              <div className={`text-center mt-5 p-3 font-demi text-primaryColor ${styles.greyHover}`}>
                Did not recieve the OTP yet ?{" "}
                <span
                  onClick={resendOtp}
                  className="text-secondaryColor hoverable"
                >
                  {" "}
                  Send Again
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Phone;
