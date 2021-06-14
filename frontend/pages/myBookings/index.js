import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { MyBookings } from "../../redux/actions/bookings";
import Link from "next/link";

export default function Booking() {
  const dispatch = useDispatch();
  const router = useRouter();
  let myBookings = useSelector(state => state.bookings?.MyBookingData?.myBookings);
  let displayBooking;
  const id = 1;
  const [modifiedBookings, setModifiedBookings] = useState({});
  const [activeClass, setActiveClass] = useState({
      button1: "active",
      button2: "",
      button3: "",
  })

  useEffect(() =>{
    dispatch(MyBookings());
  },[])

  if(myBookings) {
    displayBooking = myBookings;
  }

  function filterBySchedule(){
    setActiveClass({ 
        button1: "",
        button2: "",
        button3: "active",
        button4: ""
    })
   let myBookingsSchedule = myBookings?.filter((val)=>{
        return val.status === "scheduled";
    })
    setModifiedBookings(myBookingsSchedule);
    displayBooking = null;
  }

  function filterByCompleted(){
    setActiveClass({ 
        button1: "",
        button2: "active",
        button3: "",
        button4: ""
    })
    let myBookingsCompleted = myBookings?.filter((val)=>{
        return val.status === "completed";
    })
    setModifiedBookings(myBookingsCompleted);
    displayBooking = null;
  }

  function filterByCancelled(){
    setActiveClass({ 
        button1: "",
        button2: "",
        button3: "",
        button4: "active"
    })
    let myBookingsCompleted = myBookings?.filter((val)=>{
        return val.status === "cancelled";
    })
    setModifiedBookings(myBookingsCompleted);
    displayBooking = null;
  }

  function MyAllBookings(){
    setActiveClass({ 
        button1: "active",
        button2: "",
        button3: "",
        button4: ""
    })
    setModifiedBookings(myBookings);
    displayBooking = null;
  }

  return (
    <div>
    <div className="container">
        <div className="d-flex justify-content-center p-5">
           <button onClick={MyAllBookings} className={"btn btn-outline-primary mx-3" + activeClass.button1}>All Bookings</button>   
           <button onClick={filterByCompleted} className={"btn btn-outline-primary mx-3" + activeClass.button2}>Completed</button>   
           <button onClick={filterBySchedule} className={"btn btn-outline-primary mx-3" + activeClass.button3}>Scheduled</button>
           <button onClick={filterByCancelled} className={"btn btn-outline-primary mx-3" + activeClass.button3}>Cancelled</button>
        </div>
       {modifiedBookings && modifiedBookings.length >0 ?(
           modifiedBookings.map(val => {
               return(
            <div className="container mb-2" key={val._id}>
            <div className="row d-flex justify-content-center">
              <div className="w-100">
                <Link href={"/booking-details/"+val._id}>
                <div className="card">
                  <div
                    className="card mt-4 ride-card text-primaryColor font-medium p-3 font-18 bg-white"
                    style={{ borderRadius: "10px" }}
                  >
                    <div className="row ">
                       <div className="font-bold text-primaryColor col-lg-12 col-md-12 col-sm-12 col-12 py-3 ride-card-font">
                          {val.service}
                        </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="row ">
                          <div className="col-lg-9 col-md-8 col-sm-8 col-8 px-3">
                           <p className="font-15 mb-3">Stylist</p>
                           <p className="h5">{val.stylistName}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-6 text-primaryColor font-bold">
                        <div className="d-flex justify-content-start mb-3 text-muted">
                          {val?.status=="completed" ? (
                               <div
                               style={{ marginTop: "4px" }}
                               className="text-white btn-success status-button"
                             >
                                 Completed
                             </div>
                          ): ''}
                           { val?.status=="cancelled" ? (
                              <div
                              style={{ marginTop: "4px" }}
                              className="text-white btn-danger status-button"
                            >
                                Cancelled
                            </div>
                            ) : ''}
                            {val?.status=="scheduled" ? (
                              <div
                              style={{ marginTop: "4px" }}
                              className="text-white btn-primary status-button"
                            >
                                Scheduled
                            </div>
                            ) : ''}
                        </div>
                        <div className="text-center mt-1 d-flex justify-content-start mb-2  ">
                          <p>
                            { val.date } { val.time }
                          </p>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              </div>
            </div>
          </div>
           )})
       ): 
       displayBooking && displayBooking.length>0 && !activeClass.button2 && !activeClass.button3? (
        displayBooking.map(val => {
          return(
       <div className="container mb-2" key={val._id}>
       <div className="row d-flex justify-content-center">
         <div className="w-100">
         <Link href={"/booking-details/"+val._id}>
           <div className="card">
             <div
               className="card mt-4 ride-card text-primaryColor font-medium p-3 font-18 bg-white"
               style={{ borderRadius: "10px" }}
             >
               <div className="row ">
                  <div className="font-bold text-primaryColor col-lg-12 col-md-12 col-sm-12 col-12 py-3 ride-card-font">
                     {val.service}
                   </div>
                 <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                   <div className="row ">
                     <div className="col-lg-9 col-md-8 col-sm-8 col-8 px-3">
                      <p className="font-15 mb-3">Stylist</p>
                      <p className="h5">{val.stylistName}</p>
                     </div>
                   </div>
                 </div>
                 <div className="col-lg-6 col-md-6 col-sm-6 col-6 text-primaryColor font-bold">
                   <div className="d-flex justify-content-start mb-3 text-muted">
                   {val?.status=="completed" ? (
                          <div
                          style={{ marginTop: "4px" }}
                          className="text-white btn-success status-button"
                        >
                            Completed
                        </div>
                    ): ''}
                      { val?.status=="cancelled" ? (
                        <div
                        style={{ marginTop: "4px" }}
                        className="text-white btn-danger status-button"
                      >
                          Cancelled
                      </div>
                      ) : ''}
                      {val?.status=="scheduled" ? (
                        <div
                        style={{ marginTop: "4px" }}
                        className="text-white btn-primary status-button"
                      >
                          Scheduled
                      </div>
                      ) : ''}
                   </div>
                   <div className="text-center mt-1 d-flex justify-content-start mb-2  ">
                     <p>
                       { val.date } { val.time }
                     </p>
                     </div>
                 </div>
               </div>
             </div>
           </div>
           </Link>
         </div>
       </div>
     </div>
      )})
       ) : ''}
  </div>
    </div>
    );
  }
  