import dynamic from 'next/dynamic';
import { useState, useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import { AllBookingsDetails } from "../../../redux/actions/bookings.js";
import Link from "next/link";
const Sidebar = dynamic(() => import('../../../shared/sidebar/sidebar'), { ssr: false, loading: () => <div class="main-loader-div">
  <div class="loader">Loading...</div>
</div> });

export default function AllBookings() {
  var i = 0;
  const dispatch = useDispatch();
  const router = useRouter();
  const [sortedBookings, setSortedBookings] = useState({});
  const [ascending, setAscending] = useState(true);

  useEffect(() =>{
    dispatch(AllBookingsDetails());
  },[])

  let allBookings = useSelector(state => {return state.bookings?.AllBbookings?.allBookings});
  console.log(allBookings);

  allBookings = sortedBookings.length > 0 ? sortedBookings : allBookings;
  const sortDate = ()=>{
    if (ascending) {
        allBookings = allBookings.sort(function(a,b){
            return  new Date(a.date) -  new Date(b.date);
        });
        setAscending(false);
    } else {
        allBookings = allBookings.sort(function(a,b){
            return  new Date(b.date) -  new Date(a.date);
        });
        setAscending(true);
    }
    setSortedBookings(allBookings);
}

  return (
      <div>
        <Sidebar />
        <div class="admin-container padding-left-mobile-table">
          <div class="d-flex justify-content-between align-items-center">
          <h3>All Bookings</h3>
          </div>
          <div class="row mb-5 mt-3 user-table table-responsive">
            <table class="table table-striped font-bold">
              <thead>
                <tr className="font-16  align-middle">
                  <th scope="col">S.No</th>
                  <th scope="col" onClick={sortDate}>Date &#8645;</th>
                  <th scope="col">Client</th>    
                  <th scope="col">Stylist</th>
                  <th scope="col">Status</th>   
                  <th scope="col">Payment</th>   
                  <th scope="col">Ratings</th> 
                  <th scope="col">Action</th>  
                  <th scope="col">Refund</th>             
                </tr>
              </thead>
              <tbody>
              {allBookings && allBookings.length > 0? (
                        allBookings.map(val => {
                          i++;
                            return (
                              <tr className="font-demi align-middle" key={val._id}>
                              <td>{i}</td>
                              <th className="user-name">{val?.date}</th>
                              <td className="user-name">{val.clientName}</td>
                              <td className="user-name">{val.stylistName}</td>
                              <td>{val.status}</td>
                              <td>{val.modeOfPayment}</td>
                              <td>{val.rating?(<span>{val.rating} &#9733;</span>):"No Ratings"}</td>
                              <td>
                              <Link href={'/admin/all-bookings/'+val._id}>
                                <a>
                                <div class="btn btn-primary user-button" onClick={() => router.push('/admin/all-bookings/'+[val._id])} >View Details</div>
                                </a>
                              </Link>
                              </td>
                              <td><div class="btn btn-danger" onClick={()=>window.location.href="https://paytm.com/"}>Refund</div></td>
                          </tr>
                            )
                        })
                    ) : (
                        ''
                    )}   
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  