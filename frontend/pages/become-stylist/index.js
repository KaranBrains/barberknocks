import { useState, useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import { useRouter } from "next/router";
import { AddStylist, AllStylist, RemoveStylist } from "../../redux/actions/stylist";
import { allService,} from "../../redux/actions/service";
import Link from "next/link";

function Signup() {
    var i = 0;
    const dispatch = useDispatch();
  
    useEffect(() =>{
      dispatch(allService());
    },[])
  
    const allServices = useSelector(state => state.service?.AllData?.services);
  
    const initialState = { fullName: "", img: "", phone: "", email:"" ,service:"" ,city:""};
    const [formData, setformData] = useState(initialState);
    const [fileOneValue, setFileOneValue] = useState('');
    const [fileOne, setFileOne] = useState("");
    const router = useRouter();

  
    const handleSubmit = (e) => {
      console.log(formData)
      e.preventDefault();
      dispatch(AddStylist(formData, router))
      .then(() =>{
        router.push("/");
      }).catch(() =>{
      });
      setformData(initialState);
      setFileOne("");
    };
  
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });

  return (
    <div className="auth-bg-signup">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-12 col-12">
            <div className="card shadow px-lg-5 py-5 px-3 bg-white mt-5">
              <h1 className="text-center font-bold text-primaryColor mb-4">
                Become a Stylist..
              </h1>
              <form>
                <div className="form-group mt-4">
                <label className="font-20 py-2">Full Name</label>
                  <input
                    required
                    value={formData.fullName}
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    name="fullName"
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                  />
                </div>
                <div className="form-group mt-4">
                <label className="font-20 py-2">Service</label>
                <select
                    required
                    value={formData.service}
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    name="service"
                    type="text"
                    className="form-control"
                  >
                    <option value=""  disabled defaultValue>Select Service</option>
                    {allServices && allServices.length>0 ? 
                    allServices.map((c,i)=>{
                       return <option value={c._id} key={i}>{c.name}</option>
                    }): ''}
                  </select>
                </div>
                <div className="form-group mt-4">
                <label className="font-20 py-2">City</label>
                <select
                    required
                    value={formData.city}
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    name="city"
                    type="text"
                    className="form-control"
                  >
                    <option value=""  disabled defaultValue>Select City</option>
                    <option value="torronto" >Torronto</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="font-20 py-2">Image</label>
                  <img src={fileOne} className="img-fluid"/>
                  <div className="btn font-20 font-bold bg-tertiaryColor w-100 mt-2" onClick={()=>document.getElementById('uploading')?.click()}>Upload</div>
                  <input
                    onChange={(e) =>{
                      setFileOne(URL.createObjectURL(e.target.files[0]));
                      toBase64(e.target.files[0]).then(res=>{
                        setFileOneValue(res);
                        setformData({
                          ...formData,
                          img: res
                        });
                      })
                    }}
                    type="file"
                    class="hidden"
                    id="uploading"
                    accept=".png, .jpg, .jpeg"
                    placeholder="Stylist Image"
                    required
                  />
                </div>
                <div className="form-group mt-4">
                <label className="font-20 py-2">Phone</label>
                  <input
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    name="phone"
                    type="text"
                    className="form-control"
                    placeholder="Mobile Number"
                  />
                </div>
                <div className="form-group mt-4">
                <label className="font-20 py-2">Email</label>
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
                <div className="text-center mt-5 w-100">
                  <button
                    className="text-white bg-secondaryColor font-demi btn-blue submit-button w-100"
                    type="submit"
                    onClick={handleSubmit}
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

export default Signup;
