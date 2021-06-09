import React from "react";

function searchLocation() {
  return (
    <>
      <div className="container bg-primaryColor my-5 py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 col-md-8 col-sm-12 col-12">
            <div className="location">
              <div className="mt-4">
                <label className="font-demi text-tertiaryColor">Location</label>
                <input
                  required
                  value=""
                  name="email"
                  type="text"
                  className="form-control"
                  placeholder="Enter your location"
                />
              </div>
            </div>
            <div className="services">
              <div className="mt-4">
                <label className="font-demi text-tertiaryColor">Service</label>
                <input
                  required
                  value=""
                  name="email"
                  type="text"
                  className="form-control"
                  placeholder="Choose your service"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default searchLocation;
