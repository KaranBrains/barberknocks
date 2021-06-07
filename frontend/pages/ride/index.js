import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RideCard from "../../components/rideCard/rideCard";
import { getMyRides } from "../../redux/actions/ride";

function MyRides() {
  const dispatch = useDispatch();
  let myRides = useSelector((state) => {return state.ride?.rideData?.myRides});
  useEffect(()=>{
    dispatch(getMyRides())
  },[])

  return (
    <>
      <div className="container home mt-3">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-7 col-md-8 col-sm-2 col-12 mb-2 mt-2">
            <h3 className="text-primaryColor font-24">
              <span className="recent ml-1"> &nbsp; &nbsp; &nbsp;My Classes</span>
            </h3>
            {myRides && myRides.length > 0 ? (
              myRides.map((r) => {
                return <RideCard ride={r} />;
              })
            ) : (
              <span className="mb-4">No Classes Available</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyRides;
