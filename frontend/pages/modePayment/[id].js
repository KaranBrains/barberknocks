import { useState , useEffect} from "react";
import { Stepper } from "react-form-stepper";
import { useDispatch , useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "../../styles/Form.module.css";
import { getUserByEmail } from "../../redux/actions/auth";
import { confirmRideCash } from "../../redux/actions/ride";
import {AddPayment} from "../../redux/actions/payment";

function ModePayment() {
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.id;
  useEffect(() =>{
    dispatch(getUserByEmail());
  },[id])

  const submit = (e)=>{
    e.preventDefault();
    if(!selected) {
      return;
    } 
    if (selected === "online") {
      dispatch(AddPayment(id));
    }
    if (selected === 'cash') {
      dispatch(confirmRideCash(id,router));
    }
  }

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
        <div className="col-lg-6 col-md-8 col-sm-12 col-12">
            <div className="card shadow px-lg-5 py-5 px-3 bg-white">
              <h1 className="text-center font-bold text-primaryColor mb-4">
                Please select the mode  of payment..
              </h1>
              <form>
                <div className="mt-4">
                  <div class="form-check mb-4">
                    <input class="form-check-input" 
                    type="radio" 
                    name="flexRadioDefault" 
                    id="flexRadioDefault1" 
                    onClick={()=>{
                      setSelected("cash");
                    }}/>
                    <label class="form-check-label font-regular font-bold" for="flexRadioDefault1">
                        Cash 
                    </label>
                  </div>
                </div>
                <div className="mt-4">
                  <div class="form-check mb-4">
                    <input class="form-check-input" 
                    type="radio" 
                    name="flexRadioDefault" 
                    id="flexRadioDefault1" 
                    onClick={()=>{
                      setSelected("online");
                    }}/>
                    <label class="form-check-label font-regular font-bold" for="flexRadioDefault1">
                        Pay Online 
                    </label>
                  </div>
                </div>
                <div className="text-center mt-5 mb-3">
                  <button
                    className="text-white bg-secondaryColor font-demi btn-blue w-100 submit-button"
                    type="submit"
                    onClick={submit}
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
              <div
                className={`font-demi text-primaryColor text-center mt-4 py-3 px-3 bg-white ${styles.greyHover}`}
                onClick={()=>{
                  router.push("/add-new-address/"+id)
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

export default ModePayment;
