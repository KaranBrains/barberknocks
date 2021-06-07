import Image from "next/image";
import styles from "./Home.module.css";

function Work() {
  return (
    <>
      <div>
        <div className="container py-section px-4">
          <h2 className="text-primaryColor font-bold sub-heading text-center">
            Our Happy Customers
          </h2>
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 px-5 center">
              <Image
                src="/images/customerOne.svg"
                alt="Picture of the author"
                width={500}
                height={500}
              />
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 px-5 center">
              <Image
                src="/images/customerTwo.png"
                alt="Happy Customer"
                width={500}
                height={500}
              />
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 px-5 center">
              <Image
                src="/images/customerThree.png"
                alt="Happy Customer"
                width={500}
                height={200}
              />
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 px-5 center">
              <Image
                src="/images/customerFour.png"
                alt="Happy Customer"
                width={500}
                height={200}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container px-4 my-5">
          <h2 className="text-primaryColor font-bold sub-heading text-center">
            How it works
          </h2>
          <div className="row how-it-works pt-5">
            <div className="col-lg-4 mt-2 col-md-4 col-sm-12 col-12">
              <div className="d-flex justify-content-center">
                <div
                  className={`${styles.workNumber} text-primaryColor font-bold center`}
                  style={{ fontSize: "35px" }}
                >
                  1
                </div>
              </div>
              <h4 className="text-primaryColor font-20 mt-5 font-bold text-center">
              Confirm your slot.
              </h4>
              <p className="text-muted text-center font-demi mb-3 mt-2 font-16">
                Choose from all the available slots. We accept online payment as well as cash on site .
              </p>
            </div>
            <div className="col-lg-4 mt-2 col-md-4 col-sm-12 col-12">
              <div className="d-flex justify-content-center">
                <div
                  className={`${styles.workNumber} text-primaryColor font-bold center`}
                  style={{ fontSize: "35px" }}
                >
                  2
                </div>
              </div>
              <h4 className="text-primaryColor font-20 mt-5 font-bold text-center">
                Attend your classes.
              </h4>
              <p className="text-muted text-center font-demi mb-3 mt-2 font-16">
                Upon finishing class , you can provide your feedback.
              </p>
            </div>
            <div className="col-lg-4 mt-2 col-md-4 col-sm-12 col-12">
              <div className="d-flex justify-content-center">
                <div
                  className={`${styles.workNumber} text-primaryColor font-bold center`}
                  style={{ fontSize: "35px" }}
                >
                  3
                </div>
              </div>
              <h4 className="text-primaryColor font-20 mt-5 font-bold text-center">
                Get your Drivers License.
              </h4>
              <p className="text-muted text-center font-demi mb-3 mt-2 font-16">
                99% of our students pass their test on the first attempt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Work;
