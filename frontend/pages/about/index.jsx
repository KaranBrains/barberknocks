import Carousel from "react-bootstrap/Carousel";
import { useRouter } from "next/router";

function About() {
  const router = useRouter();
  return (
    <div>
      <div className="main">
        <div className="container text-center font-bold text-white py-5">
          <h1 className="pt-5">Road Rules</h1>
          <p className="font-18 font-medium mt-3">
            We’re passionate about creating tools that bridge the gaps between
            digital and physical workplace experiences.
          </p>
          <p className="font-medium">
          Road Rules . 
          The best driving school in area today. 
          Get cheap driving lessons by Indian professional 
          instructor. We provide excellent lessons for both manual and
           automatic vehicles. Well-known for careful and responsible 
           driving classes. No matter where ever you are in the city, 
           We give you highly professional and user friendly
            drivers. You would love to get associated with us as we make sure 
            to give you best driving lessons that will let you 
            start your first drive with full confidence and eventually make
             you quite professional. There are perhaps a wide variety of 
             services offered to all age groups as per their need and requirement. 
          </p>
          <div className="d-flex justify-content-center my-5">
            <button
              className="text-white bg-secondaryColor font-demi px-lg-5 btn-blue submit-button"
              style={{ marginRight: "20px" }}
              onClick={()=>
                router.push('/fullCalendar')
              }
            >
              View Slots
            </button>
            <button className="text-white bg-secondaryColor font-demi px-lg-5 btn-blue submit-button"
              onClick={()=>
                router.push('/contact')
              }>
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <div className="container text-center my-5 text-primaryColor">
        <h1 className="font-bold pt-5">Four Brands. One Mission.</h1>
        <p className="font-18 font-medium mt-3 pb-5">
          iOFFICE, Teem, ManagerPlus and Hippo CMMS brands are one family,
          working together to serve thousands of organizations and their
          millions of employees around the world. We are creative, curious and
          collaborative with a passion for inspiring the heart and soul of
          today’s workplace. See what defines our culture and why we're truly
          stronger together.
        </p>
      </div>

      <div className="text-center my-5 container">
        <img src="/images/about.gif" alt="about" className="img-fluid" />
      </div>

      <div className="container text-center my-5 text-primaryColor">
        <h1 className="font-bold pt-5">We are passionate</h1>
        <p className="font-18 font-medium mt-3 pb-5">
          Since our early days as a meeting space booking app startup, Teem has
          grown into a workplace experience platform encompassing room and desk
          reservations, wayfinding, visitor management, and insights. As part of
          the iOFFICE family of companies, we are united in our drive to
          eliminate hurdles to productivity and enable exceptional workplace
          experiences.
        </p>
        <button className="text-white bg-secondaryColor font-demi px-lg-5 btn-blue submit-button"
          onClick={()=>
            router.push('/fullCalendar')
          }>
          Book your First Class
        </button>
      </div>

      <div className="container text-center my-5 text-primaryColor">
        <div className="text-secondaryColor font-demi pt-5">
          What our employees are saying
        </div>
        <h1 className="font-bold py-3">We love what we do</h1>

        <Carousel controls={false} indicators>
          <Carousel.Item>
            <div className="px-lg-5">
              <h3 className="font-bold">Keat Johns</h3>
              <p className="font-18 font-medium mt-3 pb-5">
                Since our early days as a meeting space booking app startup,
                Teem has grown into a workplace experience platform encompassing
                room and desk reservations, wayfinding, visitor management, and
                insights. As part of the iOFFICE family of companies, we are
                united in our drive to eliminate hurdles to productivity and
                enable exceptional workplace experiences.
              </p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="px-lg-5">
              <h3 className="font-bold">Keat Johns</h3>
              <p className="font-18 font-medium mt-3 pb-5">
                Since our early days as a meeting space booking app startup,
                Teem has grown into a workplace experience platform encompassing
                room and desk reservations, wayfinding, visitor management, and
                insights. As part of the iOFFICE family of companies, we are
                united in our drive to eliminate hurdles to productivity and
                enable exceptional workplace experiences.
              </p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="px-lg-5">
              <h3 className="font-bold">Keat Johns</h3>
              <p className="font-18 font-medium mt-3 pb-5">
                Since our early days as a meeting space booking app startup,
                Teem has grown into a workplace experience platform encompassing
                room and desk reservations, wayfinding, visitor management, and
                insights. As part of the iOFFICE family of companies, we are
                united in our drive to eliminate hurdles to productivity and
                enable exceptional workplace experiences.
              </p>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default About;
