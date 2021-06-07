import React from "react";
import Link from "next/link";

function RideCard(props) {
  return (
    <>
      <div className="container mb-2">
        <div className="row d-flex justify-content-center">
          <div className="w-100">
            <div className="card">
              <div
                className="card mt-4 ride-card text-primaryColor font-medium p-3 font-18"
                style={{ borderRadius: "10px" }}
              >
                <div className="row ">
                  <div className="col-lg-9 col-md-8 col-sm-8 col-8">
                    <div className="font-bold text-primaryColor ride-card-font">
                      {props?.ride?.date} {props?.ride?.time}
                    </div>
                    <hr className="my-2" />
                    <div className="row ">
                      <div className="col-lg-9 col-md-8 col-sm-8 col-8 px-3">
                        {props?.ride?.status == "completed"? (
                        <div
                        style={{ marginTop: "4px" }}
                        className="text-white btn-success status-button"
                      >
                        {props?.ride?.status.charAt(0).toUpperCase() + props?.ride?.status.slice(1) }
                      </div>
                        ) : (
                          <div
                          style={{ marginTop: "4px" }}
                          className="text-white btn-primary status-button"
                        >
                          {props?.ride?.status.charAt(0).toUpperCase() + props?.ride?.status.slice(1) }
                        </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-4 col-4 text-primaryColor font-bold">
                    <div className="d-flex justify-content-end text-muted">
                      &#36;{props?.ride?.price}
                    </div>
                    <Link href={"/ride-details/" + props?.ride?._id}>
                      <div className="text-center mt-3 d-flex justify-content-end  ">
                        <button
                          className="text-white bg-secondaryColor font-demi rounded mobile-top"
                          style={{ border: "none" }}
                        >
                          Details
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className= "row">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RideCard;
