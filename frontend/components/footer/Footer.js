import Link from "next/link";
import Image from "next/image";
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';

function Footer() {
  return (
        <div className="row border-top-custom">
         <div className="pt-5 width-60">
           <div className="row  pl-5">
           <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-4">
            <div className="card">
              <h3
                className="font-weight-bold mb-4"
                style={{ fontSize: "24px" }}
              >
                About Us
              </h3>
              <Link href="/about">
                <div className="font-demi font-17 mb-lg-3 mb-2 hoverable">
                Get to know us
                </div>
              </Link>
              <Link href="/about">
                <div className="font-demi font-17 mb-lg-3 mb-2 hoverable">
                Privacy policy
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-4">
            <div className="card">
              <h3
                className="font-weight-bold mb-4"
                style={{ fontSize: "24px" }}
              >
                Contact Us 
              </h3>
              <Link href="/contact">
                <div className="font-demi font-17 mb-lg-3 mb-2 hoverable">
                Help
                </div>
              </Link>
              <Link href="/contact">
                <div className="font-demi font-17 mb-lg-3 mb-2 hoverable">
                Terms of Use
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-4">
            <div className="card">
              <h3
                className="font-weight-bold mb-4"
                style={{ fontSize: "24px" }}
              >
                Inquiries
              </h3>
              <Link href="/contact">
                <div className="font-demi font-17 mb-lg-3 mb-2 hoverable">
                Become a stylist ? 
                </div>
              </Link>
              <Link href="/contact">
                <div className="font-demi font-17 mb-lg-3 mb-2 hoverable">
                General inquiries
                </div>
              </Link>
            </div>
           </div>
           <div className="row pt-2">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 my-4">
            <div className="card">
                <div className="d-flex flex-row">
                  <Link href="/linkedin">
                   <a className="social-icon"><LinkedInIcon style={{ fontSize: 44 }} /></a>
                 </Link>
                <Link href="/instagram">
                  <a className="social-icon"><InstagramIcon style={{ fontSize: 44 }} /></a>
                </Link>
                <Link href="/facebook">
                  <a className="social-icon"><FacebookIcon style={{ fontSize: 44 }} /></a>
                </Link>
                </div>
             <div className="font-demi font-17 mt-2 mb-lg-3 mb-2 small-screen-hidden">
               <span>BarberKnocks @2021 All Rights Reserved</span>
             </div>
            </div>
          </div>
          </div>
          </div>
         </div>
          <div className="footer-image">
               <div>
               <Image
                  src="/images/Group_12.svg"
                  alt="logo"
                  className="img-fluid-custom"
                  layout="fill"
                />
               </div>
              <div className="card-custom">
              <div className="d-flex justify-content-center align-items-start flex-column text-white footer-content-padding">
             <span className="footer-heading-1 font-bold">Get Started</span>
             <span className="footer-heading-2 pb-4">Book your mobile hair and beauty</span>
             <Link href={'/serviceLocation'}>
               <a>
                <button className="btn btn-light footer-button">Book Today</button>
               </a>
             </Link>
             </div>
            </div>
          </div>
          <div className="font-demi w-100 text-center font-17 mt-2 mb-lg-3 mb-2 small-screen-hidden-2">
               <span>BarberKnocks @2021 All Rights Reserved</span>
             </div>
         </div>
  );
}

export default Footer;
