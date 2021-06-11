import dynamic from 'next/dynamic';
import { useState, useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import { AddStylist, AllStylist, RemoveStylist } from "../../../redux/actions/stylist";
import { allService,} from "../../../redux/actions/service";
import {baseUrl} from "../../../redux/api/index"
import Link from "next/link";

const Sidebar = dynamic(() => import('../../../shared/sidebar/sidebar'), { ssr: false, loading: () => <div class="main-loader-div">
  <div class="loader">Loading...</div>
</div> });

export default function Stylist() {
  var i = 0;
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(AllStylist());
    dispatch(allService());
  },[])

  const allServices = useSelector(state => state.service?.AllData?.services);
  const allStylists = useSelector(state => state.stylist?.AllData?.stylists);

  const initialState = { fullName: "", img: "", phone: "", email:"" ,service:"" ,city:""};
  const [showModal, setShowModal] = useState(false);
  const [formData, setformData] = useState(initialState);
  const [fileOneValue, setFileOneValue] = useState('');
  const [fileOne, setFileOne] = useState("");
  const router = useRouter();

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setformData(initialState);
    setFileOne("");
  };

  const handleSubmit = (e) => {
    console.log(formData)
    e.preventDefault();
    dispatch(AddStylist(formData, router))
    .then(() =>{
      handleClose();
      dispatch(AllStylist());
    }).catch(() =>{
    });
    setformData(initialState);
    setFileOne("");
  };

  const deleteStylist = (id) => {
    dispatch(RemoveStylist(id))
    .then(() =>{
      dispatch(AllStylist());
    });
  }


  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

    return (
      <div>
      {showModal ? (
        <Modal className="mt-5 modal-card" show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="font-bold ml-1">Add a Stylist</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                <div className="text-center mt-5">
                  <button
                    className="text-white bg-secondaryColor font-demi btn-blue submit-button"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
        <Sidebar />
        <div class="admin-container padding-left-mobile-table">
          <div class="d-flex justify-content-between align-items-center">
          <h3>Stylist</h3>
          <button class="btn btn-primary" onClick={handleShow}>
                Add Stylist
          </button>
          </div>
          <div class="row mb-5 mt-3 user-table table-responsive">
            <table class="table table-striped font-bold">
              <thead>
                <tr className="font-16  align-middle">
                  <th scope="col">S.No</th>
                  <th scope="col">Image</th>    
                  <th scope="col">Name</th>
                  <th scope="col">City</th>
                  <th scope="col">Service</th>
                  <th scope="col">Email</th>  
                  <th scope="col">Phone</th>   
                  <th scope="col">Ratings</th>   
                  <th scope="col">Action</th>  
                  <th scope="col">Remove</th>               
                </tr>
              </thead>
              <tbody>
              {allStylists && allStylists.length>0 ? (
                        allStylists.map(val => {
                          i++;
                            return (
                              <tr className="font-demi align-middle" key={val._id}>
                              <td>{i}</td>
                              <td>
                              <img
                              className="instructor_image"
                              src={baseUrl + val.img}
                              alt={val.fullName + " image"}
                              />
                              </td>
                              <td className="user-name">{val.fullName}</td>
                              <td className="user-name">{val.city}</td>
                              <td className="user-name">{val.service}</td>
                              <td>{val.email}</td>
                              <td>{val.phone}</td>
                              <td>Ratings</td>
                              <td>
                              <Link href={'/admin/stylist/'+val._id}>
                                <a>
                                <div class="btn btn-primary user-button" onClick={() => router.push('/admin/stylist/'+[val._id])} >View Details</div>
                                </a>
                              </Link>
                              </td>
                              <td><div class="btn btn-danger" onClick={()=>deleteStylist(val._id)}>Remove</div></td>
                          </tr>
                            )
                        })
                    ) : (
                        ''
                    )}   
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  