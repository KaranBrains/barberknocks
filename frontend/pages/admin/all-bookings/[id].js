import { useEffect,useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import { GetBookingById ,endBooking} from "../../../redux/actions/bookings";
import { GetStylistById } from "../../../redux/actions/stylist";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
const Sidebar = dynamic(() => import('../../../shared/sidebar/sidebar'), { ssr: false, loading: () => <div class="main-loader-div">
  <div class="loader">Loading...</div>
</div> });

export default function InstructorId() {

    const dispatch = useDispatch();
    // test commit
    const router = useRouter();
    const initialState = { rating: 0, feedback: ""};
    const [showModal, setShowModal] = useState(false);
    const [formData, setformData] = useState(initialState);
    const id = router.query.id;
    let booking = useSelector(state => {return state.bookings?.BookingByID?.booking});
    let stylist = useSelector(state => {console.log(state);return state.stylist?.stylistById?.stylist});
    useEffect(() =>{
        const id = router.query.id;
        if(id) {
            dispatch(GetBookingById(id))
            .then(()=>{
              if(booking) {
                dispatch(GetStylistById(booking?.stylist));
              }
            })
        }
    },[id,booking?.stylist])

    const endBookingSubmit=(e)=>{
      e.preventDefault();
      dispatch(endBooking(booking?._id))
      .then(()=>{
          router.push("/admin/all-bookings");
      });
    }

    return(
      <>
      <Sidebar />
      {booking && stylist ? (
            <>
            <div className="container">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-10 col-md-12 col-sm-12 col-12">
                <h2
                    className="card my-3 text-primaryColor text-center font-bold"
                    style={{ fontSize: "35px" }}
                    >
                      Booking Details
                    </h2>
                  <div className="card border my-5">
                    <div className="d-flex justify-content-between px-3">
                      <div className="text-muted font-demi font-18 mt-2">
                        Slot Date
                      </div>
                      <div className="text-primaryColor font-bold font-18 mt-2">
                        {booking?.date}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between px-3">
                      <div className="text-muted font-demi font-18 mt-2">
                        Slot Time
                      </div>
                      <div className="text-primaryColor font-bold font-18 mt-2">
                        {booking?.time}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between px-3">
                      <div className="text-muted font-demi font-18 mt-2">
                        Service
                      </div>
                      <div className="text-primaryColor font-bold font-18 mt-2">
                        {booking?.service}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between px-3">
                      <div className="text-muted font-demi font-18 mt-2">
                        Client
                      </div>
                      <div className="text-primaryColor font-bold font-18 mt-2">
                        {booking?.clientName}
                      </div>
                    </div>
                    <hr className="grey-hr-confirm" />
                    <div className="d-flex justify-content-between px-3">
                      <div className="text-muted font-demi font-18 mt-2">
                        Status
                      </div>
                      <div className="text-primary font-bold font-18 mt-2">
                        {booking?.status == "scheduled" ? (
                          <span className="text-yellow">Scheduled</span>
                        ) : ''}
                        {booking?.status == "completed" ? (
                          <span className="text-success">Completed</span>
                        ) : ''}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between px-3">
                      <div className="text-muted font-demi font-18 mt-2 mobile-hidden">
                        Rating
                      </div>
                      <div className="text-primary font-bold font-18 mt-2 mobile-hidden">
                        {booking.rating}
                      </div>
                    </div>
                    <hr className="grey-hr-confirm" />
                    <div className="d-flex justify-content-between px-3">
                      <div className="text-muted font-demi font-18 mt-2 mobile-hidden">
                        Address
                      </div>
                      <div className="text-primary font-bold font-18 mt-2 mobile-hidden">
                        {booking.address}
                      </div>
                      <div className="text-primary font-bold font-8 mt-2 desktop-hidden">
                        {booking.address}
                      </div>
                    </div>
                    <hr className="grey-hr-confirm" />
                    <div className="d-flex justify-content-between px-3">
                      <div className="text-muted font-demi font-18 mt-2">
                        Stylist
                      </div>
                      <div className="text-primaryColor font-bold font-18 mt-2">
                        {stylist?.fullName}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between px-3">
                      <div className="text-muted font-demi font-18 mt-2">
                        Contact Number
                      </div>
                      <div className="text-primaryColor font-bold font-18 mt-2">
                      {stylist?.phone}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between px-3">
                      <div className="text-muted font-demi font-18 mt-2 mobile-hidden">
                        Email
                      </div>
                      <div className="text-primaryColor font-bold font-18 mt-2 mobile-hidden">
                      {stylist?.email}
                      </div>
                    </div>
                    <hr className="grey-hr-confirm" />
                    <div className="d-flex justify-content-between px-3">
                      <div className="text-muted font-demi font-18 mt-2">
                        Payment Mode
                      </div>
                      <div className="text-green font-bold font-18 mt-2">
                        {booking?.modeOfPayment == "cash"?
                        'Cash' : 'Online'}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between px-3 mb-5">
                      <div className="text-muted font-demi font-18 mt-2">
                        Total
                      </div>
                      <div className="text-green font-bold font-18 mt-2">
                      {booking?.price}
                      </div>
                    </div>
                    {/* { booking?.startedAt ? (
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
              {booking.status!="completed"?(
                <div className="text-center mt-3">
                <button
                  className="text-white bg-secondaryColor font-demi btn-blue submit-button mb-5"
                  type="submit"
                  onClick={endBookingSubmit}
                >
                  End Booking
                </button>
              </div>
              ):''}
            </div>
          </>
            ) : ''}
      </>
    )

}