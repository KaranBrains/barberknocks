import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { UserById } from "../../../redux/actions/user";
import Link from "next/link";
const Sidebar = dynamic(() => import('../../../shared/sidebar/sidebar'), { ssr: false, loading: () => <div class="main-loader-div">
  <div class="loader">Loading...</div>
</div> });

export default function Users() {
  var i = 0;
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.id;
  const [sortedRides, setSortedRides] = useState({});
  const [ascending, setAscending] = useState(true);

  useEffect(() =>{
    if(id !== undefined){
    dispatch(UserById(id));
    }
  },[id])

  const user = useSelector(state => state.user?.UsersById);

  let allRides = useSelector(state => { return state.user?.UsersById?.bookings});

  allRides = sortedRides.length > 0 ? sortedRides : allRides;
  const sortDate = ()=>{
    if (ascending) {
        allRides = allRides.sort(function(a,b){
            return  new Date(a.date) -  new Date(b.date);
        });
        setAscending(false);
    } else {
        allRides = allRides.sort(function(a,b){
            return  new Date(b.date) -  new Date(a.date);
        });
        setAscending(true);
    }
    setSortedRides(allRides);
}

    return (
      <div>
        <Sidebar />
        <div class="container mb-5 padding-left-mobile-table">
        <h3 className="mb-4">User Details</h3>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="bg-customColor h-100 py-5">
            <div>
            <input className="form-control bg-customColor font-20" value={user?.user?.fullName} disabled></input>
            </div>
            <div className="d-flex flex-column flex-lg-row flex-sm-column flex-md-column">
              <input className="form-control bg-customColor font-20" value={user?.user?.email} disabled></input>
              <input className="ml-2 form-control bg-customColor font-20" value={user?.user?.phone} disabled></input>
            </div>
            <div>
            {user?.user?.address && user?.user?.address.length > 0 ?<input className="form-control font-weight-bold bg-customColor font-20" value="Address" disabled></input>:""}
            {user?.user?.address && user?.user?.address.length > 0 ?
            user?.user?.address.map((val)=>{
            return <input className="form-control bg-customColor font-20" value={val?.street + ", " + val?.city + ", " + val?.province + ", " + val?.postalCode } disabled></input>
            })
            :("")}
            </div>
          </div>
          </div>
         </div>
        </div>
        <div class="container padding-left-mobile-table">
          <h3>Bookings</h3>
          <div class="row mb-5 mt-3 user-table table-responsive">
            <table class="table table-striped font-bold">
              <thead>
                <tr className="font-16  align-middle">
                  <th scope="col">S.No</th>
                  <th scope="col" onClick={sortDate}>Date &#8645;</th>
                  <th scope="col">Client</th>
                  <th scope="col">Stylist</th>
                  <th scope="col">Payment</th>  
                  <th scope="col">Status</th>   
                  <th scope="col">Ratings</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
              {allRides && allRides.length>0? (
                        allRides.map(val => {
                          i++;
                            return (
                              <tr className="font-demi align-middle" key={val._id}>
                              <td>{i}</td>
                              <th className="user-name">{val?.date}</th>
                              <td className="user-name">{val?.clientName}</td>
                              <td className="user-name">{val?.stylistName}</td>
                              <td>{val.modeOfPayment}</td>
                              <td>{val?.status}</td>
                              <td>{val.rating?(<span>{val.rating} &#9733;</span>):"No Ratings"}</td>
                              <td>
                              <Link href={'/admin/all-rides/'+val._id}>
                                <a>
                                <div class="btn btn-primary user-button" onClick={() => router.push('/admin/all-rides/'+[val._id])} >View Details</div>
                                </a>
                              </Link>
                              </td>
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
  