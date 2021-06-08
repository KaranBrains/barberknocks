import Carousel from "react-bootstrap/Carousel";
import { useRouter } from "next/router";

function About() {
  const router = useRouter();
  return (
    <div>
      <div className="main">
        <div
          className="container text-center font-bold text-tertiaryColor py-5 center"
          style={{ minHeight: "70vh" }}
        >
          <div className="">
            <h1 className="pt-5" style={{ lineHeight: "3rem" }}>
              Inspired by Global experiences,
              <br />
              Fueled by hard work and passion
            </h1>
          </div>          
        </div>
      </div>

      <div className="container my-5 text-primaryColor">
        <p className="font-18 font-medium mt-3 pb-5 px-lg-5 text-justify mt-5">
          iOFFICE, Teem, ManagerPlus and Hippo CMMS brands are one family,
          working together to serve thousands of organizations and their
          millions of employees around the world. We are creative, curious and
          collaborative with a passion for inspiring the heart and soul of
          today’s workplace. See what defines our culture and why we're truly
          stronger together. Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <div className="d-flex justify-content-center">
            <button
              className="text-white bg-secondaryColor font-demi px-lg-5 btn-blue submit-button"
              style={{ marginRight: "20px" }}
              onClick={() => router.push("/fullCalendar")}
            >
              View Slots
            </button>
            <button
              className="text-white bg-secondaryColor font-demi px-lg-5 btn-blue submit-button"
              onClick={() => router.push("/contact")}
            >
              Contact Us
            </button>
          </div>
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
        <button
          className="text-white bg-secondaryColor font-demi px-lg-5 btn-blue submit-button"
          onClick={() => router.push("/fullCalendar")}
        >
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
