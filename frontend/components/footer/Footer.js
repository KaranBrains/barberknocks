import Link from "next/link";
import Image from "next/image";
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import MailIcon from '@material-ui/icons/Mail';

function Footer() {
  return (
    <div className="gradient-background pt-5">
      <div className="container py-section">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-4">
            <div className="card px-3">
              <h3
                className="text-primaryColor font-bold mb-4"
                style={{ fontSize: "20px" }}
              >
                Company
              </h3>
              <Link href="/about">
                <div className="text-primaryColor font-demi font-15 mb-lg-3 mb-2 hoverable">
                  About Us
                </div>
              </Link>
              <Link href="/contact">
                <div className="text-primaryColor font-demi font-15 mb-lg-3 mb-2 hoverable">
                  Work with us
                </div>
              </Link>
              <Link href="https://www.privacypolicies.com/live/cc1b5360-1d97-42e7-9dac-321d08b592aa">
                <div className="text-primaryColor font-demi font-15 mb-lg-3 mb-2 hoverable">
                  Privacy Notice
                </div>
              </Link>
              <Link href="https://www.termsofservicegenerator.net/live.php?token=QzSOTrwxvy4POYCeSLGm4HhpCK1Y0j5T">
                <div className="text-primaryColor font-demi font-15 mb-lg-3 mb-2 hoverable">
                  Term of Service
                </div>
              </Link>
              <Link href="">
                <div className="text-primaryColor font-demi font-15 mb-lg-3 mb-2 hoverable">
                <PhoneAndroidIcon/> +1&nbsp;(778)&nbsp;889-7804
                </div>
              </Link>
              <Link href="">
                <div className="text-primaryColor font-demi font-15 mb-lg-3 mb-2 hoverable">
                <MailIcon /> roadrulescanada@gmail.com
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-4">
            <div className="card px-3">
              <h3
                className="text-primaryColor font-bold mb-4"
                style={{ fontSize: "20px" }}
              >
                Support
              </h3>
              <Link href="/contact">
                <div className="text-primaryColor font-demi font-15 mb-lg-3 mb-2 hoverable">
                  Help Center
                </div>
              </Link>

              <Link href="/contact">
                <div className="text-primaryColor font-demi font-15 mb-lg-3 mb-2 hoverable">
                  Contact Us
                </div>
              </Link>
              <Link href="/contact">
                <div className="text-primaryColor font-demi font-15 mb-lg-3 mb-2 hoverable">
                  Request a New Feature
                </div>
              </Link>
              <Link href="/contact">
                <div className="text-primaryColor font-demi font-15 mb-lg-3 mb-2 hoverable">
                  Report an Outage
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-12 my-4">
            <div className="card px-3">
              <h3
                className="text-primaryColor font-bold mb-4"
                style={{ fontSize: "30px" }}
              >
                <Image
                  src="/images/logo.svg"
                  alt="logo"
                  className="img-fluid logo"
                  width={300}
                  height={300}
                />
              </h3>
            </div>
          </div>
          <div className="text-primaryColor text-center font-demi font-15 mb-lg-3 mb-2">
            <span>@ 2021 all rights reserved</span>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
