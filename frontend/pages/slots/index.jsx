import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";

function DateSlot() {
  const onSelectedDay = (d) => {
    console.log(d);
  };
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-10 col-md-8 col-12 col-sm-12 my-5">
          <div className="shadow">
            <div className="bg-primaryColor px-lg-5 px-2 pt-2">
              <ReactHorizontalDatePicker
                selectedDay={onSelectedDay}
                enableScroll={true}
                enableDays={90}
              />
            </div>
            <div
              className="slots px-lg-5 py-5 px-2"
              style={{ minHeight: "50vh" }}
            >
              <div className="d-flex justify-content-center">
                <div
                  className="bg-secondaryColor text-white font-demi py-2 px-3 mx-2 text-center"
                  style={{ borderRadius: "5px" }}
                >
                  5:00
                </div>
                <div
                  className="bg-secondaryColor text-white font-demi py-2 px-3 mx-2 text-center"
                  style={{ borderRadius: "5px" }}
                >
                  5:00
                </div>
                <div
                  className="bg-secondaryColor text-white font-demi py-2 px-3 mx-2 text-center"
                  style={{ borderRadius: "5px" }}
                >
                  5:00
                </div>
                <div
                  className="bg-secondaryColor text-white font-demi py-2 px-3 mx-2 text-center"
                  style={{ borderRadius: "5px" }}
                >
                  5:00
                </div>
              </div>
            </div>
            <div className="text-center mb-3">
              <button
                className="text-white bg-primaryColor font-demi btn-blue submit-button mb-5"
                type="submit"
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
