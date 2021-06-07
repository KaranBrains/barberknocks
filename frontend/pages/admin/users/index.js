import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import { AllUser } from "../../../redux/actions/user";
const Sidebar = dynamic(() => import('../../../shared/sidebar/sidebar'), { ssr: false, loading: () => <div class="main-loader-div">
  <div class="loader">Loading...</div>
</div> });

export default function Users() {
  var i = 0;
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() =>{
    dispatch(AllUser());
  },[])

  const allUsers = useSelector(state => state.user?.AllUsers?.users);

    return (
      <div>
        <Sidebar />
        <div class="container padding-left-mobile-table">
          <h3>Users</h3>
          <div class="row mb-5 mt-3 user-table table-responsive">
            <table class="table table-striped font-bold">
              <thead>
                <tr className="font-16  align-middle">
                  <th scope="col">S.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>  
                  <th scope="col">Phone</th>   
                  <th scope="col">Role</th>                 
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
              {allUsers? (
                        allUsers.map(val => {
                          i++;
                            return (
                              <tr className="font-demi align-middle" key={val._id}>
                              <td>{i}</td>
                              <td className="user-name">{val.fullName}</td>
                              <td>{val.email}</td>
                              <td>{val.phone}</td>
                              <td>{val.role}</td>
                              <td>
                              <Link href={'/admin/users/'+val._id}>
                                <a>
                                <div class="btn btn-primary user-button" onClick={() => router.push('/admin/users/'+[val._id])} >View Details</div>
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
  