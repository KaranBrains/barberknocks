import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.css";
import { AllSlots } from "../../redux/actions/slot";
import Link from "next/link";
import { useRouter } from 'next/router';

function HomeMain() {
  const dispatch = useDispatch();
  const [selected, setselected] = useState('');
  const router = useRouter()
  let weekSlots;
  useEffect(() => {
    dispatch(AllSlots());
  }, []);

  const getDay = (day) => {
    switch (day) {
      case "1":
        return "Mon";
      case "2":
        return "Tue";
      case "3":
        return "Wed";
      case "4":
        return "Thur";
      case "5":
        return "Fri";
      case "6":
        return "Sat";
      default:
        return "Sun";
    }
  };
  const today = new Date();
  const weekDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  let allSlots = useSelector((state) => state.slot?.slotData?.slots);
  if (allSlots) {
    allSlots = allSlots.filter(a=>{
      if(a.status==="scheduled") {
        return a;
      }
    });
    const filterSlots = allSlots?.filter(
      (slot) =>
        new Date(slot.date) >= Date.now() && new Date(slot.date) <= weekDate
    );
    weekSlots = filterSlots?.map(f=>{
      return {
        ...f,
        date: new Date(f.date).getDate()
      }
    });
    console.log(weekSlots);
  }

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    weekDates.push({
      day: new Date(today.getTime() + i * 24 * 60 * 60 * 1000)
        .getDay()
        .toString(),
      date: new Date(today.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
    });
  }
  console.log(weekDates);
  return (
    <>
      <div className={`${styles.home}`}>
        <div className="container">
          <div className="row center" style={{ minHeight: "85vh" }}>
            <div className="col-xl-7 col-lg-8 col-md-10 col-sm-12 col-12">
              <div className="card bg-white shadow py-lg-5 py-4 px-3 px-lg-5 my-5">
                <div className="d-flex justify-content-between">
                  <div className="font-bold font-25 text-primaryColor">
                    Book your first class with us
                  </div>
                  <div className="text-center">
                    <Link href="/fullCalendar">
                      <button
                        className="text-white bg-secondaryColor font-demi px-lg-5 btn-blue submit-button"
                        type="submit"
                      >
                        View All
                      </button>
                    </Link>
                  </div>
                </div>
                <hr />
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        {weekDates?.map((weekDate) => (
                          <th scope="col">
                            <div className="font-bold text-primaryColor text-center">
                              {getDay(weekDate.day)}
                              <br />
                              <div className="font-25">{weekDate.date}</div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                        {weekDates?.map((weekDate) => (
                            <td>
                            {weekSlots?.map((weekSlot) => (
                              weekSlot.date == weekDate.date ? (
                                <div 
                                className="text-primaryColor font-demi py-2 text-center all-slot calendar-event mt-4" 
                                id={weekSlot._id} 
                                onClick={async (e)=>{
                                  e.preventDefault();
                                  document.getElementById(selected)?.classList.toggle("calendar-event"); 
                                  document.getElementById(selected)?.classList.toggle("selected"); 
                                  setselected(weekSlot._id)
                                  document.getElementById(weekSlot._id).classList.toggle("calendar-event"); 
                                  document.getElementById(weekSlot._id).classList.toggle("selected"); 
                                }}>
                                {weekSlot.time}
                              </div>
                              ) : ''
                              ))}
                            </td>
                          ))}
                        </tr>
                    </tbody>
                  </table>
                </div>
                <hr />
                <div className="d-flex justify-content-end">
                  <div className="text-center">
                    <button
                      className="text-white bg-secondaryColor font-demi px-lg-5 btn-blue submit-button"
                      type="submit"
                      onClick={()=>{
                        if (selected) {
                          router.push('/slot-details/'+selected)
                        }
                      }}
                    >
                      Next &nbsp;&nbsp;&nbsp;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeMain;
