import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllSlots } from "../../redux/actions/slot";
import { AllStylist } from "../../redux/actions/stylist";
import Link from "next/link";
import { useRouter } from "next/router";

function DateSlot() {
  const dispatch = useDispatch();
  const [selected, setselected] = useState("");
  const today = new Date();
  const [selectedDate, setselectedDate] = useState(today);
  const router = useRouter();
  const service = router?.query?.service;
  const city = router?.query?.city;

  const onSelectedDay = (date) => {
    setTimeout(()=>{
      const ele = document.getElementsByClassName('date-day-Item-selected');
      const newDate = (ele[0].innerText.slice(4));
      const filterSlots = allSlots.filter(slot=>{
        if (
          (new Date(slot.date).getDate() == newDate)
        ) {return slot;}
      });
      setDisplaySlots(filterSlots);
    },300)
  };
  let allSlots = useSelector((state) => state.slot?.slotData?.slots);
  useEffect(() => {
    dispatch(AllSlots());
    dispatch(AllStylist());
    if(allSlots) {
      setDisplaySlots(allSlots);
    }
  }, [service,city]);

  const [displaySlots, setDisplaySlots] = useState(allSlots);
  const allStylists = useSelector((state) => state.stylist?.AllData?.stylists);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-10 col-md-8 col-12 col-sm-12 my-5">
          <div className="shadow">
            <div className="bg-primaryColor px-lg-5 px-2 pt-2">
              <ReactHorizontalDatePicker
                selectedDay={(date)=>onSelectedDay(date)}
                enableScroll={true}
                enableDays={30}
                enableDaysBefore={0}
              />
            </div>
            <div
              className="slots px-lg-5 py-5 px-2"
              style={{ minHeight: "50vh" }}
            >
              {/* {weekDates?.map((weekDate) => (
                <div>
                  
                </div>
              ))} */}
              {/* {selectedDate? ( */}
              { displaySlots ? (
                              displaySlots.map((slot) => {
                                console.log("hello");
                                  return (
                                    <div
                                      className="text-primaryColor font-demi py-2 text-center all-slot calendar-event mt-4"
                                      id={slot._id}
                                      onClick={async (e) => {
                                        e.preventDefault();
                                        document
                                          .getElementById(selected)
                                          ?.classList.toggle("calendar-event");
                                        document
                                          .getElementById(selected)
                                          ?.classList.toggle("selected");
                                        setselected(slot._id);
                                        document
                                          .getElementById(slot._id)
                                          .classList.toggle("calendar-event");
                                        document
                                          .getElementById(slot._id)
                                          .classList.toggle("selected");
                                      }}
                                    >
                                      {slot.time}
                                      <br />
                                      {slot.stylistName}
                                    </div>
                                  );
                              })
              ):''}
            </div>
            <div className="text-center mb-3">
              <button
                className="text-white bg-primaryColor font-demi btn-blue submit-button mb-5"
                type="submit"
                onClick={() => {
                  if (selected) {
                    router.push("/slot-details/" + selected);
                  }
                }}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateSlot;
