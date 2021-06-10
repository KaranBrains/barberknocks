import dynamic from 'next/dynamic';
import { useState, useContext, useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import { ReactReduxContext } from 'react-redux'
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import { addService, allService, removeService } from "../../../redux/actions/service";
import {baseUrl} from "../../../redux/api/index"
const Sidebar = dynamic(() => import('../../../shared/sidebar/sidebar'), { ssr: false, loading: () => <div class="main-loader-div">
  <div class="loader">Loading...</div>
</div> });

export default function Instructor() {
  var i = 0;
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(allService());
  },[])

  const allServices = useSelector(state => state.service?.AllData?.services);

  const initialState = { name: "", icon: ""};
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
    e.preventDefault();
    dispatch(addService(formData, router))
    .then(() =>{
      handleClose();
      dispatch(allService());
    }).catch(() =>{
    });
    setformData(initialState);
    setFileOne("");
  };

  const deleteInstructor = (id) => {
    dispatch(removeService(id))
    .then(() =>{
      dispatch(allService());
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
              <div className="font-bold ml-1">Add a Service</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
                <div className="form-group mt-4">
                <label className="font-20 py-2">Name</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="form-group">
                  <label className="font-20 py-2">Icon</label>
                  <img src={fileOne} className="img-fluid"/>
                  <div className="btn font-20 font-bold bg-tertiaryColor w-100 mt-2" onClick={()=>document.getElementById('uploading')?.click()}>Upload</div>
                  <input
                    onChange={(e) =>{
                      setFileOne(URL.createObjectURL(e.target.files[0]));
                      toBase64(e.target.files[0]).then(res=>{
                        setFileOneValue(res);
                        setformData({
                          ...formData,
                          icon: res
                        });
                      })
                    }}
                    type="file"
                    class="hidden"
                    id="uploading"
                    accept=".png, .jpg, .jpeg"
                    placeholder="Service Image"
                    required
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
          <h3>Service</h3>
          <button class="btn btn-primary" onClick={handleShow}>
                Add Service
          </button>
          </div>
          <div class="row mb-5 mt-3 user-table table-responsive">
            <table class="table table-striped font-bold">
              <thead>
                <tr className="font-16  align-middle">
                  <th scope="col">S.No</th>
                  <th scope="col">Image</th>    
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>             
                </tr>
              </thead>
              <tbody>
              {allServices && allServices.length>0 ? (
                        allServices.map(val => {
                          i++;
                            return (
                              <tr className="font-demi align-middle" key={val._id}>
                              <td>{i}</td>
                              <td>
                              <img
                              className="instructor_image"
                              src={baseUrl + val.icon}
                              alt={val.fullName + " image"}
                              />
                              </td>
                              <td className="user-name">{val.name}</td>
                              <td><div class="btn btn-danger" onClick={()=>deleteInstructor(val._id)}>Remove</div></td>
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
  