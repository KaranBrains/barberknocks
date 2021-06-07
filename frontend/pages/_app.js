import { useEffect, useState } from "react";
import "../styles/globals.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import "react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css";
import { wrapper } from "../redux/store";
import Head from "next/head";
import Footer from "../components/footer/Footer";
import { useRouter } from "next/router";
import NavbarComponent from "../components/navbar/Navbar";
import jwt_decode from "jwt-decode";
import Home from "./index.js";
import AdminHome from "./admin/dashboard/index";


function MyApp({ Component, pageProps }) {
  const [user, setuser] = useState(null);
  let decode = null;
  let allowed = false;
  const router = useRouter();
  const route = router.route.slice(1, 6);
  useEffect(() => {
    const data = localStorage.getItem("token");
    if(data){
      decode =  jwt_decode(data);
    }    
    setuser(decode);
  }, []);
  if (user) {
    allowed = false;
  }
  if (router.pathname.startsWith("/confirm-address")) {
    allowed = false;
  }
  return (
    <>
      <Head>
        <script
          src="https://kit.fontawesome.com/bd43ee06c8.js"
          crossorigin="anonymous"
        ></script>
        <meta name="theme-color" content="#1e4c6b" />
      </Head>  
      {route == "admin" && user && user.role=="admin"? (
        <Component {...pageProps} />
      ) : (   
        route=="admin" && user && user.role=="user" ? (
          <>
          <NavbarComponent />
          {/* {allowed ? <Component {...pageProps}/>  : <Home /> } */}
          <Home />  
          {/* <Footer /> */}
        </>
        ) : (
          route!="admin" &&  user && user.role=="admin" ? (
            <>
                <AdminHome/>  
            </>
          ) : (
            route!="admin" &&  user && user.role=="user" ? (
              <>
              <NavbarComponent />
                  <Component {...pageProps}/>
              {/* <Footer /> */}
              </>
            ) : (
              !user && route=="admin" ? (
                <>
                <NavbarComponent />
                    <Home />
                {/* <Footer /> */}
                </>
              ) : (
              <>
              <NavbarComponent />
                  <Component {...pageProps}/>
              {/* <Footer /> */}
              </>
              )
            )
          ) 
        ) 
      )}
    </>
  );
}

export default wrapper.withRedux(MyApp);
