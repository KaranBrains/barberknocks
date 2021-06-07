import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";

function DateSlot() {
  const onSelectedDay = (d) => {
    console.log(d);
  };
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-6 col-md-8 col-12 col-sm-12 my-5">
          <div className="shadow">
            <div className="bg-primaryColor px-lg-5 py-lg-5 px-2 py-3">
              <ReactHorizontalDatePicker
                selectedDay={onSelectedDay}
                enableScroll={true}
                enableDays={90}
              />
            </div>
            <div className="slots px-lg-5 py-lg-5 px-2 bg-tertiaryColor"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateSlot;
