import { useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AllSlots } from "../../redux/actions/slot";
import { useRouter } from 'next/router';


function MyCalendar() {
  const dispatch = useDispatch();
  const router = useRouter()
  useEffect(() => {
    dispatch(AllSlots());
  }, []);

  const now = new Date();
  const myEventsList = [];
  let allSlots = useSelector((state) => state.slot?.slotData?.slots);
  if (allSlots) {
    allSlots = allSlots.filter(a=>{
      if(a.status==="scheduled") {
        return a;
      }
    });
    const filterSlots = allSlots.map((slot) =>{
      const startDate = new Date(slot.date +'T'+ slot.time); 
      const endDate = new Date(startDate.getTime()+ 60*1000*60); 
      return myEventsList.push({
        id: slot._id,
        start: (startDate),
        end: (endDate),
        title: slot.time,
      })
    }
    );
  }

  const localizer = momentLocalizer(moment);
  let allViews = Object.keys(Views).map((k) => Views[k]);
  allViews.pop();
  
  return (
    <div className="container my-5 text-primaryColor font-bold" id="#home">
      <Calendar
        selectable
        views={allViews}
        localizer={localizer}
        events={myEventsList}
        onSelectEvent={(e)=>{
          router.push('/slot-details/'+e.id)
        }}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default MyCalendar;
