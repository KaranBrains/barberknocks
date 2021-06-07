import styles from "./Home.module.css";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import RoomIcon from '@material-ui/icons/Room';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import GavelIcon from '@material-ui/icons/Gavel';

function Features() {
  return (
    <div className="my-5">
      <div className={`container ${styles.pySection} px-4`}>
        <h2
          className={`font-bold text-primaryColor mb-5 ${styles.mobileCenter}`}
        >
          Your key to safe Driving.<br />
          {/* Smart Drivers start <br />
          here */}
        </h2>

        <div className="row">
          <div
            className={`col-lg-4 col-md-4 col-sm-6 col-12 p-2 ${styles.mobileCenter}`}
          >
            <div className="card bg-white h-100">
              <div className="card-body rounded shadow">
                <div className="image-container text-center my-3">
                <LocalActivityIcon className="text-primaryColor mb-2" fontSize="large"></LocalActivityIcon>
                </div>
                <h4 className="text-primaryColor mt-4 mb-3 font-18 font-bold text-center">
                  Choice
                </h4>
                <div className="font-demi text-muted text-center mb-3">
                We are the best in terms of services that we offer you. We ensure safety as our main priority therefore we are well equipped with professional and well trained instructors.
                </div>
              </div>
            </div>
          </div>
          <div
            className={`col-lg-4 col-md-4 col-sm-6 col-12 p-2 ${styles.mobileCenter}`}
          >
            <div className="card bg-white h-100">
              <div className="card-body rounded shadow">
                <div className="image-container text-center my-3">
                  <CheckBoxIcon className="text-primaryColor mb-2" fontSize="large"></CheckBoxIcon>
                </div>
                <h4 className="text-primaryColor mt-4 mb-3 font-18 font-bold text-center">
                  99% PASS RATE
                </h4>
                <div className="font-demi text-muted text-center  mb-3">
                  Success rate of our students is very high.
                </div>
              </div>
            </div>
          </div>

          <div
            className={`col-lg-4 col-md-4 col-sm-6 col-12 p-2 ${styles.mobileCenter}`}
          >
            <div className="card bg-white h-100">
              <div className="card-body rounded shadow">
                <div className="image-container text-center my-3">
                <DriveEtaIcon className="text-primaryColor mb-2" fontSize="large"></DriveEtaIcon>
                </div>
                <h4 className="text-primaryColor mt-4 mb-3 font-18 font-bold text-center">
                  Best Cars
                </h4>
                <div className="font-demi text-muted text-center  mb-3">
                Both the classroom driving classes as well as online sessions are available with a wide range of cars.
                </div>
              </div>
            </div>
          </div>

          <div
            className={`col-lg-4 col-md-4 col-sm-6 col-12 p-2 ${styles.mobileCenter}`}
          >
            <div className="card bg-white h-100">
              <div className="card-body rounded shadow">
                <div className="image-container text-center my-3">
                <RoomIcon className="text-primaryColor mb-2" fontSize="large"></RoomIcon>
                </div>
                <h4 className="text-primaryColor mt-4 mb-3 font-18 font-bold text-center">
                  Pickup
                </h4>
                <div className="font-demi text-muted text-center  mb-3">
                  We provide door pickup. Literally thousands of destinations. No
                  extra charges.
                </div>
              </div>
            </div>
          </div>

          <div
            className={`col-lg-4 col-md-4 col-sm-6 col-12 p-2 ${styles.mobileCenter}`}
          >
            <div className="card bg-white h-100">
              <div className="card-body rounded shadow">
                <div className="image-container text-center my-3">
                <PeopleAltIcon className="text-primaryColor mb-2" fontSize="large"></PeopleAltIcon>
                </div>
                <h4 className="text-primaryColor mt-4 mb-3 font-18 font-bold text-center">
                  We train all ages.
                </h4>
                <div className="font-demi text-muted text-center  mb-3">
                We have driving instructors who are certified. Apart from that, they are also fit both mentally as well as physically and have many years of driving experience.
                </div>
              </div>
            </div>
          </div>

          <div
            className={`col-lg-4 col-md-4 col-sm-6 col-12 p-2 ${styles.mobileCenter}`}
          >
            <div className="card bg-white h-100">
              <div className="card-body rounded shadow">
                <div className="image-container text-center my-3">
                <GavelIcon className="text-primaryColor mb-2" fontSize="large"></GavelIcon>
                </div>
                <h4 className="text-primaryColor mt-4 mb-3 font-18 font-bold text-center">
                  Road Rules
                </h4>
                <div className="font-demi text-muted text-center  mb-3">
                We will train you correctly with all road rules and regulations.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
