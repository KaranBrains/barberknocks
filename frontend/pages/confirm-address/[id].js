import { useState, useEffect } from "react";
import { Stepper } from "react-form-stepper";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "../../styles/Form.module.css";
import { getUserByEmail } from "../../redux/actions/auth";


function ConfirmAddress() {
  const [selected, setSelected] = useState("");
  
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.id;
  const user = useSelector((state) => {
    return state.main?.authData?.user;
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    
    dispatch(getUserByEmail());
  }, [id]);

  const submit = (e) => {
    e.preventDefault();
    if (!selected) {
      return;
    }
    localStorage.setItem("address", selected);
    router.push("/modePayment/" + id);
  };

  return (
    <>
      <div className="container my-5">
        <div className="row d-flex justify-content-center mb-4">
          <div className="col-lg-10 col-sm-12 col-md-12 col-12 font-regular px-0">
            <Stepper
              steps={[{ label: "Step 1" }, { label: "Step 2" }]}
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
                activeBgColor: "#730fe4",
                completedBgColor: "#420a83",
                labelFontSize: "1rem",
                circleFontSize: "1rem",
                size: "3em",
                fontWeight: 900,
              }}
              activeStep={0}
            />
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-12 col-12">
            <div className="card shadow px-lg-5 py-5 px-3 bg-white">
              <h1 className="text-center font-bold text-primaryColor mb-4">
                Please select the pickup Address..
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mt-4">
                  {user && user.address.length > 0 ? (
                    user.address.map((a) => {
                      return (
                        <div class="form-check mb-4">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            onClick={() => {
                              setSelected(a._id);
                            }}
                          />
                          <label
                            class="form-check-label font-regular font-bold"
                            for="flexRadioDefault1"
                          >
                            {a.street + "," + a.province + "," + a.city}
                          </label>
                        </div>
                      );
                    })
                  ) : (
                    <span className="font-regular font-bold">
                      {" "}
                      No address added!{" "}
                    </span>
                  )}
                </div>
                <div className="text-center mt-5 mb-3">
                  <button
                    className="text-white bg-secondaryColor font-demi btn-blue w-100 submit-button"
                    type="submit"
                    onClick={submit}
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
            <div
              className={`font-demi text-primaryColor text-center mt-4 py-3 px-3 bg-white ${styles.greyHover}`}
              onClick={() => {
                router.push("/add-new-address/" + id);
              }}
            >
              Not in the list?{" "}
              <span className="ml-2 text-secondaryColor">Add New</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmAddress;
