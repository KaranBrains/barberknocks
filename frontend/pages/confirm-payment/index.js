import { useEffect} from "react";
import { useDispatch} from "react-redux";
import { useRouter } from "next/router";
import { confirmRideOnline } from "../../redux/actions/ride";

function ModePayment() {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() =>{
    dispatch(confirmRideOnline(router));
  },[])

  return (
    <>
      <div className="container my-5">
        <div className="row d-flex justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12 col-12 text-center text-primaryColor">
            <h2>We are cofirming your class , please do not refresh this page!</h2>
        </div>
        </div>
      </div>
    </>
  );
}

export default ModePayment;
