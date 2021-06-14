import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllSlots , serviceSlots } from "../../redux/actions/slot";
import { AllStylist } from "../../redux/actions/stylist";
import Link from "next/link";
import { useRouter } from "next/router";
import { allSlot } from "../../redux/api";
import { baseUrl } from "../../redux/api/index";

function DateSlot() {
  const dispatch = useDispatch();
  const [selected, setselected] = useState("");
  const today = new Date();
  const [selectedSlot, setselectedSlot] = useState('');
  const router = useRouter();
  const service = router?.query?.service;
  const city = router?.query?.city;

  const onSelectedDay = (date) => {
    setTimeout(() => {
      document.getElementById(
        "slots-instructor"
      ).style.visibility = "hidden";
      document
      .getElementById(selected)
      ?.classList.toggle("calendar-event");
    document
      .getElementById(selected)
      ?.classList.toggle("selected");
      setselected('');
      const ele = document.getElementsByClassName("date-day-Item-selected");
      const newDate = ele[0].innerText.slice(4);
      let filterSlots = allSlots.filter((slot) => {
        if (new Date(slot.date).getDate() == newDate && slot.status==="scheduled") {
          return slot;
        }
      });
      let refinedFilterSlots = [] ;
      setFilteredSlots(filterSlots);
      filterSlots.forEach(slot=>{
          if (!refinedFilterSlots?.find((s) => s.time == slot.time && s._id!=slot._id)) {
            refinedFilterSlots.push(slot);
          }
      })
      setDisplaySlots(refinedFilterSlots);
    }, 300);
  };
  let allSlots = useSelector((state) => {console.log(state);return state.slot?.serviceSlot?.slots});
  useEffect(() => {
    if (service,city) {
      dispatch(serviceSlots(service,city));
    }
    dispatch(AllStylist());
    if (allSlots) {
      let filterSlots = allSlots.filter((slot) => {
        if (new Date(slot.date).getDate() == (new Date()).getDate()) {
          return slot;
        }
      });
      setDisplaySlots(filterSlots);
    }
  }, [service, city]);

  const [displaySlots, setDisplaySlots] = useState(allSlots);
  const [filteredSlots, setFilteredSlots] = useState(allSlots);
  const [displayStylists, setDisplayStylists] = useState();
  const allStylists = useSelector((state) => state.stylist?.AllData?.stylists);

  return (
    <div className="auth-bg">
          <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-12 col-md-8 col-12 col-sm-12 my-5">
          <div className="card shadow bg-white">
            <div className="bg-primaryColor px-lg-3 px-2 pt-2">
              <ReactHorizontalDatePicker
                selectedDay={(date) => onSelectedDay(date)}
                enableScroll={true}
                enableDays={30}
                enableDaysBefore={0}
              />
            </div>
            <div
              className="slots px-lg-5 py-5 px-2"
              style={{ minHeight: "40vh" }}
            >
              {displaySlots
                ? displaySlots.map((slot) => {
                    return (
                      <div
                        className="text-primaryColor font-demi py-2 text-center all-slot calendar-event mt-4"
                        id={slot._id}
                        onClick={async (e) => {
                          e.preventDefault();
                          setselectedSlot(slot._id);
                          let filteredSlots = allSlots.filter(s=>{
                            if(s.date == slot.date) {
                              return s;
                            }
                          })
                          filteredSlots = filteredSlots.filter(s=>{
                            if(s.time == slot.time) {
                              return s;
                            }
                          });
                          let availableStylists = [];
                          filteredSlots.forEach(slot=>{
                            if(allStylists.find(s=> s._id === slot.stylist) && !availableStylists.find(s=> s._id===slot.stylist)) {
                              availableStylists.push(allStylists.find(s=> s._id === slot.stylist));
                            };
                          });
                          setDisplayStylists(availableStylists);
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
                          document.getElementById(
                            "slots-instructor"
                          ).style.visibility = "initial";
                        }}
                      >
                        {slot.time}
                      </div>
                    );
                  })
                : ""}
            </div>
            <div id="slots-instructor" >
            <p className="mt-3 h4 font-bold mb-4 text-center">Available Stylists</p>
              <div className="row mb-5 px-3" >
                {displayStylists && displayStylists.length > 0
                  ? displayStylists.map((val, i) => {
                      return (
                        <div 
                          className="col-lg-3 py-3 col-md-4 col-sm-4 col-4 custom-margin"
                          id={val._id}
                          onClick={()=>{
                            const selectedSlot = filteredSlots.find(d=>d._id === selected);
                            console.log(filteredSlots);
                            setselected(filteredSlots.find(d=>d.stylist === val._id && d.time===selectedSlot.time)._id);
                            document.getElementById(val._id)?.classList.toggle("border");
                          }}>
                          <img
                            className="img-fluid"
                            src={`${baseUrl}${val.img}`}
                            width={280}
                            height={300}
                          ></img>
                          <p className="mt-3 heading-image font-bold">{val.fullName}</p>
                          <p className="experience-color h6">{val.experience}</p>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
            <div className="text-center mb-3">
              <button
                className="text-white bg-primaryColor font-demi btn-blue submit-button mb-5"
                disabled = {!selected? true: null}
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
    </div>
  );
}

export default DateSlot;
