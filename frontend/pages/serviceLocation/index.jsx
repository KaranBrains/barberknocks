import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { allService } from "../../redux/actions/service";
import Link from "next/link";
import { baseUrl } from "../../redux/api/index";
import swal from "sweetalert";

function Login() {
  const initialState = { city: "torronto", service: "" };
  const [formData, setformData] = useState(initialState);
  const router = useRouter();
  const [serviceId, setServiceId] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    setServiceId(router?.query?.id)
    dispatch(allService());
  }, [serviceId]);

  const allServices = useSelector((state) => state.service?.AllData?.services);

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(signIn(formData, router));
    if (!formData.city || !formData.service) {
      swal({
        text: "You need to select both the entries",
        icon: "info",
      });
      return;
    } else {
      router.push(`/slots?city=${formData.city}&service=${formData.service}`);
    }
    // setformData(initialState);
    // router.push('/slots')
  };

  return (
    <div className="auth-bg">
      <div className="container py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-10 col-md-12 col-sm-12 col-12">
            <div className="card shadow px-3 px-lg-5 py-5 bg-white mt-5">
              <form onSubmit={handleSubmit}>
                <div className="my-4">
                  <label className="font-demi text-primaryColor">
                    Location
                  </label>
                  <select
                    required                    
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    name="city"                   
                    className="form-control pb-2 font-medium"
                  ><option value="toronto" className="font-medium" default value="torronto">Torronto</option></select>
                </div>
                <label className="font-demi text-primaryColor mt-5">
                  Services
                </label>
                <div className="row">
                  {allServices && allServices.length > 0
                    ? allServices.map((val) => {                      
                        return (
                          <div className="col-lg-4 col-md-6 col-sm-12 col-12 mt-4">                            
                            <div className="card" onClick={()=>{
                              console.log(val._id)
                                setformData({
                                  ...formData,
                                  service: val._id,
                                })
                                console.log(formData);
                            }}>
                                <a>
                                  <div className={`popular-service-card text-center align-items-center px-3 py-3 ${formData.service == val._id && "border-service"}`}>
                                    <img
                                      src={baseUrl + val.icon}
                                      width={70}
                                      height={70}
                                    ></img>
                                    <p className="mt-2 font-demi text-dark font-20 ">
                                      {val.name}
                                    </p>
                                  </div>
                                </a>
                            </div>
                          </div>
                        );
                      })
                    : ""}
                </div>

                <div className="text-center mt-5 mb-3">
                  <button
                    className="text-white bg-secondaryColor font-demi btn-blue submit-button"
                    type="submit"
                  >
                    Continue
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

export default Login;
