import { useState, useContext, useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import { ReactReduxContext } from 'react-redux'
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import { GetStylistById } from "../../../redux/actions/stylist";
import {baseUrl} from "../../../redux/api/index"
import dynamic from 'next/dynamic';
const Sidebar = dynamic(() => import('../../../shared/sidebar/sidebar'), { ssr: false, loading: () => <div class="main-loader-div">
  <div class="loader">Loading...</div>
</div> });

export default function InstructorId() {

  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.id;

  useEffect(() =>{
    if(id !== undefined){
    dispatch(GetStylistById(id))
    .then(() =>{
      setShowText(true);
    });;
    }
  },[id])

  const instructorById = useSelector(state => {console.log(state);return state.stylist?.stylistById?.stylist});
  console.log(instructorById)

  const initialState = { fullName: instructorById?.fullName, img: instructorById?.img, phone: instructorById?.phone, email:instructorById?.email};
  const [showModal, setShowModal] = useState(false);
  const [showText, setShowText] = useState(false);
  const [formData, setformData] = useState(initialState);
  const [fileOneValue, setFileOneValue] = useState('');
  const [fileOne, setFileOne] = useState(baseUrl + instructorById?.img);

  const handleShow = () => 
  { dispatch(GetInstructorById(router.query.id))
    setformData(initialState);
    setFileOne(baseUrl + instructorById?.img);
    setShowModal(true);
  }
  
  const handleClose = () => {
    setShowModal(false);
    setformData(initialState);
    setFileOne(baseUrl + instructorById?.img);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateInstructorById(router.query.id, formData))
    .then(() =>{
      handleClose();
      dispatch(GetInstructorById(router.query.id));
    }).catch(() =>{
    });
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

    return(
      <div>
        <Sidebar />
       { showText ? (
       <div class="container mb-5 padding-left-mobile-table">
        <div className="row">
          <div class="d-flex justify-content-between mb-3">
            <div className="col-12 font-25 text-center font-demi text-primaryColor">
                Stylist Profile
            </div>
            {/* <button class="btn btn-primary" onClick={handleShow}>
                Edit Instructor
            </button> */}
          </div>
          </div>
          <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-12 col-12 ">
            <div className="py-3 bg-tertiaryColor">
              <div class="text-center">
                  <img src={baseUrl + instructorById?.img} alt="img" class="mb-3 img-fluid user-img" />
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12 col-12">
          <div className="bg-tertiaryColor h-100 py-5 px-2">
            <div>
            <input className="form-control font-20" value={instructorById?.fullName} disabled></input>
            </div>
            <div className="d-flex flex-column flex-lg-row flex-sm-column flex-md-column">
              <input className="form-control font-20" value={instructorById?.email} disabled></input>
              <input className="ml-2 form-control font-20" value={instructorById?.phone} disabled></input>
            </div>
          </div>
          </div>
          <br />
          <div>
           {/* {instructorById.rating && instructorById.rating.length > 0 ?
           instructorById.rating.map((value)=>{
             return (
              <div className="row">
               <div className="col-lg-12 font-16 col-md-12 col-sm-12 col-12  bg-tertiaryColor px-1 px-md-2 px-lg-5 py-2">
                 <div className="d-flex justify-content-between align-items-center">
                   <div><input className="form-control font-weight-bold" value={value.clientName} disabled></input></div>
                   <div className="font-weight-bold">{value.stars}	&#9733;</div>
                 </div>
                 <div className="">
                 <input className="form-control d-inline" value={value.feedback} disabled></input>
                 </div>
               </div>
               </div>
             )
           }) : (
            <div className="col-lg-12 font-16 col-md-12 col-sm-12 col-12  bg-tertiaryColor px-5 py-2">
            <div>
             No Feedback Available
            </div>
          </div>
           )
          } */}
         </div>
         </div>
        </div>
         ) : (
        ""
      )}
    </div>
  )
}