import { useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import { useRouter } from "next/router";
import { getRideById , endRide } from "../../../redux/actions/ride";
import { GetInstructorById } from "../../../redux/actions/instructor";
import dynamic from 'next/dynamic';
const Sidebar = dynamic(() => import('../../../shared/sidebar/sidebar'), { ssr: false, loading: () => <div class="main-loader-div">
  <div class="loader">Loading...</div>
</div> });


export default function InstructorId() {

  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.id;
  let ride = useSelector(state => {return state.ride?.rideData?.ride});
  const instructorById = useSelector(state => state.instructor?.instructorById?.instructor);
  useEffect(() =>{
      const id = router.query.id;
      if(id) {
          dispatch(getRideById(id))
          .then(()=>{
            if(ride) {
              dispatch(GetInstructorById(ride.instructor))
            }
          })
      }
  },[id,ride?.instructor])

  const endClass = () =>{
    dispatch(endRide(id,router))
  }

    return(
        <div>
            <Sidebar />
           { ride && instructorById ? (
            <>
            <div className="container">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-10 col-md-12 col-sm-12 col-12">
                <h2
                    className="card my-3 text-primaryColor text-center font-bold"
                    style={{ fontSize: "35px" }}
                    >
                      Class Details
                    </h2>
                  <div className="card border my-5">
                    <div className="d-flex justify-content-between px-3">
                      <div className="text-muted font-demi font-18 mt-2">
                        Class Date
                      </div>
                      <div className="text-primaryColor font-bold font-18 mt-2">
                        {ride?.date}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between px-3">
                      <div className="text-muted font-demi font-18 mt-2">
                        Class Time
                      </div>
                      <div className="text-primaryColor font-bold font-18 mt-2">
                        {ride?.time}
                      </div>
                    </div>
                    <hr className="grey-hr-confirm" />
                    <div className="d-flex justify-content-between px-3">
                      <div className="text-muted font-demi font-18 mt-2">
                        Status
                      </div>
                      <div className="text-primary font-bold font-18 mt-2">
                        {ride?.status == "scheduled" ? (
                          <span className="text-yellow">Scheduled</span>
                        ) : ''}
                        {ride?.status == "completed" ? (
                          <span className="text-success">Completed</span>
                        ) : ''}
                      </div>
                    </div>
                    <hr className="grey-hr-confirm" />
                    <div className="d-flex justify-content-between px-3">
                      <div className="text-muted font-demi font-18 mt-2 mobile-hidden">
                        Pickup
                      </div>
                      <div className="text-primary font-bold font-18 mt-2 mobile-hidden">
                        {ride.address}
                      </div>
                      <div className="text-primary font-bold font-8 mt-2 desktop-hidden">
                        {ride.address}
                      </div>
                    </div>
                    <hr className="grey-hr-confirm" />
                    <div className="d-flex justify-content-between px-3">
                      <div className="text-muted font-demi font-18 mt-2">
                        Instructor
                      </div>
                      <div className="text-primaryColor font-bold font-18 mt-2">
                        {instructorById?.fullName}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between px-3">
                      <div className="text-muted font-demi font-18 mt-2">
                        Contact Number
                      </div>
                      <div className="text-primaryColor font-bold font-18 mt-2">
                      {instructorById?.phone}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between px-3">
                      <div className="text-muted font-demi font-18 mt-2 mobile-hidden">
                        Email
                      </div>
                      <div className="text-primaryColor font-bold font-18 mt-2 mobile-hidden">
                      {instructorById?.email}
                      </div>
                    </div>
                    <hr className="grey-hr-confirm" />
                    <div className="d-flex justify-content-between px-3">
                      <div className="text-muted font-demi font-18 mt-2">
                        Payment Mode
                      </div>
                      <div className="text-green font-bold font-18 mt-2">
                        {ride?.modeOfPayment == "cash"?
                        'Cash' : 'Online'}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between px-3 mb-5">
                      <div className="text-muted font-demi font-18 mt-2">
                        Total
                      </div>
                      <div className="text-green font-bold font-18 mt-2">
                      {ride?.price}
                      </div>
                    </div>
                    {/* { ride?.startedAt ? (
                      <div className="d-flex justify-content-between px-3">
                        <div className="text-muted font-demi font-18 mt-2">
                          Started at
                      </div>
                        <div className="text-primaryColor font-bold font-18 mt-2">
                          {ride?.startedAt}
                      </div>
                      </div>
                    ) : ''} */}
                    {/* { ride?.endedAt ? (
                      <div className="d-flex justify-content-between px-3">
                        <div className="text-muted font-demi font-18 mt-2">
                          Ended at
                      </div>
                        <div className="text-primaryColor font-bold font-18 mt-2">
                         {ride?.endedAt}
                      </div>
                      </div>
                    ) : ''} */}
                    {/* {ride?.status != "Cancelled" ? (
                      <>
                        <hr className="grey-hr-confirm" />
                        <div className="d-flex justify-content-between px-3">
                          <div className="text-muted font-demi font-18">
                            Price per seat
                          </div>
                          <div className="text-primaryColor font-bold font-18">
                            &#36;{ride?.price}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between px-3">
                        <div className="text-muted font-demi font-18">
                          Total seats Booked
                        </div>
                        <div className="text-primaryColor font-bold font-18">
                          {myBookings}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between px-3 mb-5">
                        <div className="text-muted font-demi font-18">
                          Total
                        </div>
                        <div className="text-green font-bold font-18">
                        &#36;{myBookings ? myBookings*Number(ride?.price) + myBookings*Number(500)  : 0}
                        </div>
                      </div>              
                    </>
                    ) : (
                      <span className="mb-5">&nbsp;</span>
                    )} */}
                  </div>
                </div>
              </div>
              {ride.status!="completed"?(
                <div className="text-center mt-3">
                <button
                  className="text-white bg-secondaryColor font-demi btn-blue submit-button mb-5"
                  type="submit"
                  onClick={endClass}
                >
                  End Class
                </button>
              </div>
              ):''}
            </div>
          </>
            ) : ''}
        </div>
    )
}