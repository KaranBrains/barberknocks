import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { MyBookings } from "../../redux/actions/bookings";

export default function Booking() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [modifiedBookings, setModifiedBookings] = useState({});
  const [activeClass, setActiveClass] = useState({
      button1: "",
      button2: "",
      button3: "",
  })

  useEffect(() =>{
    dispatch(MyBookings());
  },[])

  let myBookings = useSelector(state => state.bookings?.MyBookingData?.myBookings);
  console.log(myBookings)

  function filterBySchedule(){
    setActiveClass({ 
        button1: "",
        button2: "",
        button3: "active",
    })
   let myBookingsSchedule = myBookings?.filter((val)=>{
        return val.status === "scheduled";
    })
    setModifiedBookings(myBookingsSchedule);
  }

  function filterByCompleted(){
    setActiveClass({ 
        button1: "",
        button2: "active",
        button3: "",
    })
    let myBookingsCompleted = myBookings?.filter((val)=>{
        return val.status === "completed";
    })
    setModifiedBookings(myBookingsCompleted);
  }

  function MyAllBookings(){
    setActiveClass({ 
        button1: "active",
        button2: "",
        button3: "",
    })
    setModifiedBookings(myBookings);
  }

  return (
    <div className="container">
        <div className="d-flex justify-content-center p-5">
           <button onClick={MyAllBookings} className={"btn btn-outline-primary mx-3 " + activeClass.button1}>All Bookings</button>   
           <button onClick={filterByCompleted} className={"btn btn-outline-primary mx-3 " + activeClass.button2}>Completed</button>   
           <button onClick={filterBySchedule} className={"btn btn-outline-primary mx-3 " + activeClass.button3}>Scheduled</button>
        </div>
       {modifiedBookings && modifiedBookings.length >0 ?(
           modifiedBookings.map(val => {
               return(
            <div className="container mb-2" key={val._id}>
            <div className="row d-flex justify-content-center">
              <div className="w-100">
                <div className="card">
                  <div
                    className="card mt-4 ride-card text-primaryColor font-medium p-3 font-18"
                    style={{ borderRadius: "10px" }}
                  >
                    <div className="row ">
                       <div className="font-bold text-primaryColor col-lg-12 col-md-12 col-sm-12 col-12 py-3 ride-card-font">
                          {val.clientName}
                        </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="row ">
                          <div className="col-lg-9 col-md-8 col-sm-8 col-8 px-3">
                           <p className="font-15 mb-3">Assigned</p>
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
                                 {val.status}
                             </div>
                          ):(
                            <div
                            style={{ marginTop: "4px" }}
                            className="text-white btn-primary status-button"
                          >
                              {val.status}
                          </div>
                          )}
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
              </div>
            </div>
          </div>
           )})
       ): (" ")}
  </div>
    );
  }
  