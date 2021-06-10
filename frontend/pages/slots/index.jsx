import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllSlots } from "../../redux/actions/slot";
import { AllStylist } from "../../redux/actions/stylist";
import Link from "next/link";
import { useRouter } from "next/router";
import { allSlot } from "../../redux/api";
import { baseUrl } from "../../redux/api/index";

function DateSlot() {
  const dispatch = useDispatch();
  const [selected, setselected] = useState("");
  const today = new Date();
  const [selectedDate, setselectedDate] = useState(today);
  const router = useRouter();
  const service = router?.query?.service;
  const city = router?.query?.city;

  const onSelectedDay = (date) => {
    setTimeout(() => {
      const ele = document.getElementsByClassName("date-day-Item-selected");
      const newDate = ele[0].innerText.slice(4);
      let filterSlots = allSlots.filter((slot) => {
        if (new Date(slot.date).getDate() == newDate) {
          return slot;
        }
      });
      // filterSlots = filterSlots.filter((slot) => {
      //   if (!filterSlots.find((s) => s.time == slot.time)) {
      //     return slot;
      //   }
      // });
      setDisplaySlots(filterSlots);
    }, 300);
  };
  let allSlots = useSelector((state) => state.slot?.slotData?.slots);
  useEffect(() => {
    dispatch(AllSlots());
    dispatch(AllStylist());
    if (allSlots) {
      setDisplaySlots(allSlots);
    }
  }, [service, city]);

  const [displaySlots, setDisplaySlots] = useState(allSlots);
  const allStylists = useSelector((state) => state.stylist?.AllData?.stylists);
  console.log(allStylists);
  console.log(allSlots);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-10 col-md-8 col-12 col-sm-12 my-5">
          <div className="shadow">
            <div className="bg-primaryColor px-lg-5 px-2 pt-2">
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
                          document.getElementById(
                            "slots-instructor"
                          ).style.visibility = "initial";
                        }}
                      >
                        {slot.time}
                        <br />
                        {slot.stylistName}
                      </div>
                    );
                  })
                : ""}
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
      <div className="row" id="slots-instructor">
        {allStylists && allStylists.length > 0
          ? allStylists.map((val, i) => {
              return (
                <div className="col-lg-3 py-3 col-md-4 col-sm-12 col-12 custom-margin">
                  {console.log(val)}
                  <img
                    className="img-fluid"
                    src={`${baseUrl}${val.img}`}
                    width={280}
                    height={300}
                  ></img>
                  <p className="mt-3 h4 font-bold">{val.fullName}</p>
                  <p className="experience-color h6">{val.experience}</p>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default DateSlot;
